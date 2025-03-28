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

      // Use full window dimensions with padding
      const width = window.innerWidth * 0.9; // 90% of window width
      const height = (window.innerHeight - 60) * 0.9; // 90% of available height
      const padding = 100; // Padding from edges

      // Create SVG with adjusted dimensions
      svg = d3
        .select(graphContainer.value)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", [
          -padding,
          -padding,
          width + 2 * padding,
          height + 2 * padding,
        ])
        .style("background-color", "#ffffff");

      // Adjust simulation forces for better connections
      simulation = d3
        .forceSimulation(graphData.value.nodes)
        .force(
          "link",
          d3
            .forceLink(graphData.value.links)
            .id((d) => d.id)
            .distance((d) => {
              if (d.type === "host-remote") return 250; // Increased from 150
              if (d.type === "remote-remote") return 200; // Increased from 120
              return 150; // Increased from 80
            })
            .strength(0.7) // Reduced from 1.0 to allow more flexibility
        )
        .force("charge", d3.forceManyBody().strength(-1200)) // Increased repulsion from -800
        .force(
          "x",
          d3.forceX(width / 2).strength(0.05) // Reduced from 0.1 to allow more spread
        )
        .force(
          "y",
          d3.forceY(height / 2).strength(0.05) // Reduced from 0.1 to allow more spread
        )
        .force(
          "collision",
          d3
            .forceCollide()
            .radius((d) => {
              if (d.type === "host") return 100; // Increased from 70
              if (d.type === "remote") return 80; // Increased from 60
              return 60; // Increased from 50
            })
            .strength(0.8) // Increased from 0.5 for stronger collision avoidance
        );

      // Create arrow markers
      const defs = svg.append("defs");

      // Define arrow markers
      ["host-remote", "remote-remote", "component"].forEach((type) => {
        defs
          .append("marker")
          .attr("id", type)
          .attr("viewBox", "0 -5 10 10")
          .attr("refX", type === "component" ? 42 : 52)
          .attr("refY", 0)
          .attr("markerWidth", 6)
          .attr("markerHeight", 6)
          .attr("orient", "auto")
          .append("path")
          .attr("d", "M0,-5L10,0L0,5")
          .attr("fill", type === "host-remote" ? "#4CAF50" : "#2c3e50");
      });

      // Create links with arrows
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
          if (d.type === "host-remote") return 2;
          if (d.type === "remote-remote") return 1.5;
          return 1;
        })
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
        .style("stroke-width", 2);

      // Add name labels inside nodes
      node
        .append("text")
        .attr("dy", -5)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .style("font-size", (d) => {
          if (d.type === "host") return "16px";
          if (d.type === "remote") return "14px";
          return "12px";
        })
        .style("font-weight", "500")
        .style("font-family", "system-ui, -apple-system, sans-serif")
        .style("pointer-events", "none")
        .text((d) => d.name);

      // Add port labels inside nodes
      node
        .append("text")
        .attr("dy", 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .style("font-size", (d) => {
          if (d.type === "host") return "12px";
          return "11px";
        })
        .style("font-family", "system-ui, -apple-system, sans-serif")
        .style("font-weight", "400")
        .style("opacity", "0.9")
        .style("pointer-events", "none")
        .text((d) => `Port: ${d.port}`);

      // Update path generation
      simulation.on("tick", () => {
        // Contain nodes within bounds
        graphData.value.nodes.forEach((d) => {
          d.x = Math.max(padding, Math.min(width - padding, d.x));
          d.y = Math.max(padding, Math.min(height - padding, d.y));
        });

        // Update link paths
        link.attr("d", (d) => {
          const source = d.source;
          const target = d.target;

          // Calculate node radius
          const sourceRadius =
            source.type === "host" ? 60 : source.type === "remote" ? 50 : 40;
          const targetRadius =
            target.type === "host" ? 60 : target.type === "remote" ? 50 : 40;

          // Calculate the total distance
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate the unit vector
          const unitX = dx / distance;
          const unitY = dy / distance;

          // Calculate start and end points
          const startX = source.x + unitX * sourceRadius;
          const startY = source.y + unitY * sourceRadius;
          const endX = target.x - unitX * (targetRadius + 5); // Reduced gap to 5px
          const endY = target.y - unitY * (targetRadius + 5);

          return `M${startX},${startY}L${endX},${endY}`;
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
            remotes: ["header", "body", "tile1"],
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
          tile1: {
            port: "3003",
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
