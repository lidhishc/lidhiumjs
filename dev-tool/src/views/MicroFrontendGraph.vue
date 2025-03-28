<template>
  <div class="app">
    <h1>{{ projectName }}</h1>
    <div ref="graphContainer" class="graph-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onUnmounted } from "vue";
import * as d3 from "d3";

interface LidhiumConfig {
  project: string;
  webapp: string;
  bundler: string;
  apps: {
    [key: string]: {
      port: string;
      appType: string;
      remotes: string[];
      exposedComponents: Record<string, any>;
      url: string;
    };
  };
}

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
  port: string;
  layer: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: string;
}

export default defineComponent({
  name: "MicroFrontendGraph",
  setup() {
    const config = ref<LidhiumConfig | null>(null);
    const projectName = ref("");
    const graphContainer = ref<HTMLElement | null>(null);
    let svg: any = null;
    let simulation: any = null;

    const graphData = computed(() => {
      if (!config.value) {
        console.log("No config available");
        return { nodes: [], links: [] };
      }

      const nodes: GraphNode[] = [];
      const links: GraphLink[] = [];
      const apps = config.value.apps;

      // First create all app nodes
      Object.entries(apps).forEach(([name, app]) => {
        nodes.push({
          id: name,
          name,
          type: app.appType,
          port: app.port,
          layer: app.appType === "host" ? 0 : 1,
        });
      });

      // Then create component nodes and their relationships
      Object.entries(apps).forEach(([name, app]) => {
        // Add exposed components
        Object.entries(app.exposedComponents || {}).forEach(
          ([componentName, details]) => {
            const componentId = `${name}-${componentName}`;
            nodes.push({
              id: componentId,
              name: componentName,
              type: "component",
              port: app.port,
              layer: 2,
            });

            // Link component to its provider app
            links.push({
              source: name,
              target: componentId,
              type: "component",
            });
          }
        );

        // Add app-to-app relationships (direction from provider to consumer)
        app.remotes.forEach((remote) => {
          if (app.appType === "host") {
            // For host relationships, reverse direction to show remotes being imported into host
            links.push({
              source: remote, // The remote app (provider)
              target: name, // The host app (consumer)
              type: "host-remote",
            });
          } else {
            // For remote-remote relationships
            links.push({
              source: remote, // The app providing components
              target: name, // The app consuming components
              type: "remote-remote",
            });
          }
        });
      });

      console.log("Generated graph data:", { nodes, links });
      return { nodes, links };
    });

    const createGraph = () => {
      if (!graphContainer.value || !graphData.value.nodes.length) return;

      // Clear previous graph
      d3.select(graphContainer.value).selectAll("*").remove();

      // Use full window dimensions
      const width = window.innerWidth;
      const height = window.innerHeight - 60; // Account for header

      // Create SVG with full dimensions
      svg = d3
        .select(graphContainer.value)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [0, 0, width, height])
        .style("background-color", "#ffffff");

      // Adjust simulation forces for better organization
      simulation = d3
        .forceSimulation<GraphNode>(graphData.value.nodes)
        .force(
          "link",
          d3
            .forceLink<GraphNode, GraphLink>(graphData.value.links)
            .id((d) => d.id)
            .distance((d) => {
              // Increase distances for better spacing
              if (d.type === "host-remote") return width * 0.25;
              if (d.type === "remote-remote") return width * 0.25;
              return width * 0.15; // Component links
            })
        )
        .force("charge", d3.forceManyBody().strength(-2000))
        .force(
          "x",
          d3
            .forceX<GraphNode>()
            .x((d) => {
              // Create clear horizontal layers
              if (d.type === "remote") {
                return width * 0.3; // Remote apps on the left
              }
              if (d.type === "host") {
                return width * 0.7; // Host (shell) on the right
              }
              // Components near their parent apps
              const parentApp = d.id.split("-")[0];
              return parentApp === "header" ? width * 0.15 : width * 0.45;
            })
            .strength(1) // Stronger x-force for clearer layers
        )
        .force(
          "y",
          d3
            .forceY<GraphNode>()
            .y((d) => {
              if (d.type === "host") {
                return height * 0.5; // Center shell vertically
              }
              if (d.type === "remote") {
                // Spread remotes vertically
                return d.name === "header" ? height * 0.3 : height * 0.7;
              }
              // Position components near their parent apps
              const parentApp = d.id.split("-")[0];
              return parentApp === "header" ? height * 0.3 : height * 0.7;
            })
            .strength(0.8)
        )
        .force("collision", d3.forceCollide().radius(80)); // Prevent node overlap

      // Create arrow markers with correct direction
      const defs = svg.append("defs");

      // Arrow markers for different connection types
      ["host-remote", "remote-remote", "component", "remote-component"].forEach(
        (type) => {
          defs
            .append("marker")
            .attr("id", type)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", type.includes("component") ? 30 : 35)
            .attr("refY", 0)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-6L12,0L0,6")
            .attr("fill", type.includes("host") ? "#4CAF50" : "#2c3e50");
        }
      );

      // Create links with clear direction
      const link = svg
        .append("g")
        .selectAll("path")
        .data(graphData.value.links)
        .join("path")
        .attr("stroke", (d) => {
          switch (d.type) {
            case "host-remote":
              return "#4CAF50";
            case "remote-remote":
              return "#2c3e50";
            default:
              return "#757575";
          }
        })
        .attr("stroke-width", (d) => {
          if (d.type === "host-remote") return 4;
          if (d.type === "remote-remote") return 3;
          return 2;
        })
        .attr("stroke-opacity", 1)
        .attr("fill", "none")
        .attr("marker-end", (d) => `url(#${d.type})`);

      // Create nodes with larger sizes
      const node = svg
        .append("g")
        .selectAll("g")
        .data(graphData.value.nodes)
        .join("g");

      // Add node circles with increased sizes
      node
        .append("circle")
        .attr("r", (d) => {
          if (d.type === "host") return 60;
          if (d.type === "remote") return 50;
          return 40;
        })
        .style("fill", (d) => {
          switch (d.type) {
            case "host":
              return "#4CAF50";
            case "remote":
              return "#2c3e50";
            default:
              return "#757575";
          }
        })
        .style("stroke", "#ffffff")
        .style("stroke-width", 4);

      // Add labels with larger fonts
      node
        .append("text")
        .attr("dy", (d) => (d.type === "host" ? -65 : -55))
        .attr("text-anchor", "middle")
        .attr("fill", "#2c3e50")
        .style("font-size", (d) => {
          if (d.type === "host") return "24px";
          if (d.type === "remote") return "20px";
          return "18px";
        })
        .style("font-weight", "600")
        .style("font-family", "system-ui, -apple-system, sans-serif")
        .text((d) => d.name);

      // Add port labels with larger fonts
      node
        .append("text")
        .attr("dy", (d) => (d.type === "host" ? 75 : 65))
        .attr("text-anchor", "middle")
        .attr("fill", "#666666")
        .style("font-size", "16px")
        .style("font-family", "system-ui, -apple-system, sans-serif")
        .text((d) => `Port: ${d.port}`);

      // Update positions with curved paths showing direction
      simulation.on("tick", () => {
        link.attr("d", (d) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dr = Math.sqrt(dx * dx + dy * dy) * 1.2;
          return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
        });

        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

      // Add drag behavior
      node.call(
        d3
          .drag<any, GraphNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

      console.log("Graph initialization complete");
    };

    // Add window resize handler
    const handleResize = () => {
      createGraph();
    };

    onMounted(() => {
      config.value = {
        project: "myapp",
        webapp: "vue3",
        bundler: "webpack",
        apps: {
          shell: {
            port: "3000",
            appType: "host",
            remotes: ["header", "body"],
            exposedComponents: {},
            url: "http://localhost:3000",
          },
          header: {
            port: "3001",
            appType: "remote",
            remotes: [],
            exposedComponents: {
              TestMyAPP: {
                source: "./src/components/TestMyAPP.vue",
                remoteComponentValue: "header/TestMyAPP",
              },
            },
            url: "http://localhost:3001",
          },
          body: {
            port: "3002",
            appType: "remote",
            remotes: ["header"],
            exposedComponents: {
              Body: {
                source: "./src/components/Body.vue",
                remoteComponentValue: "body/Body",
              },
            },
            url: "http://localhost:3002",
          },
        },
      };

      projectName.value = config.value.project;
      console.log("Config loaded:", config.value);

      // Initialize graph after a short delay to ensure container is ready
      setTimeout(() => {
        if (graphContainer.value) {
          createGraph();
        } else {
          console.error("Graph container not found after delay");
        }
      }, 100);

      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      if (simulation) {
        simulation.stop();
      }
      window.removeEventListener("resize", handleResize);
    });

    return {
      projectName,
      graphContainer,
    };
  },
});
</script>

<style scoped>
.app {
  padding: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

h1 {
  color: #2c3e50;
  margin: 20px 0;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
}

.graph-container {
  flex: 1;
  width: 100%;
  border: none;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
