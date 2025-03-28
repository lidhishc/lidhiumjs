<template>
  <div class="app">
    <h1>{{ projectName }}</h1>
    <div v-if="config" class="graph-container" ref="graphContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onUnmounted } from "vue";
import {
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  drag,
  Selection,
  Simulation,
  SimulationNodeDatum,
} from "d3";

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

interface GraphNode {
  id: string;
  name: string;
  type: string;
  port: string;
  components?: string[];
  layer: number;
}

interface GraphLink {
  source: string;
  target: string;
  type: string;
  components?: string[];
}

export default defineComponent({
  name: "MicroFrontendGraph",
  setup() {
    const config = ref<LidhiumConfig | null>(null);
    const projectName = ref("");
    const graphContainer = ref<HTMLElement | null>(null);
    let svg: Selection<SVGSVGElement, unknown, null, undefined> | null = null;
    let simulation: Simulation<SimulationNodeDatum, undefined> | null = null;

    const graphData = computed(() => {
      if (!config.value) return { nodes: [], links: [] };

      const nodes: GraphNode[] = [];
      const links: GraphLink[] = [];

      // Create nodes for each app and their components
      Object.entries(config.value.apps).forEach(([name, app]) => {
        // Add main app node
        nodes.push({
          id: name,
          name,
          type: app.appType,
          port: app.port,
          layer: app.appType === "host" ? 0 : 1,
        });

        // Add component nodes
        Object.entries(app.exposedComponents).forEach(
          ([componentName, component]) => {
            nodes.push({
              id: `${name}-${componentName}`,
              name: componentName,
              type: "component",
              port: app.port,
              layer: 2,
            });

            // Link component to its app
            links.push({
              source: name,
              target: `${name}-${componentName}`,
              type: "component",
            });
          }
        );

        // Create links for remotes
        app.remotes.forEach((remote) => {
          // Host to Remote connection
          if (app.appType === "host") {
            links.push({
              source: name,
              target: remote,
              type: "host-remote",
            });
          } else {
            // Remote to Remote connection
            links.push({
              source: name,
              target: remote,
              type: "remote-remote",
            });
          }
        });
      });

      return { nodes, links };
    });

    // const fetchConfig = async () => {
    //   try {
    //     const response = await fetch("/api/lidhium-config");
    //     const data = await response.json();
    //     config.value = data;
    //     projectName.value = data.project;
    //   } catch (error) {
    //     console.error("Failed to fetch lidhium config:", error);
    //   }
    // };

    const createGraph = () => {
      if (!graphContainer.value || !graphData.value) {
        console.error("Graph container or data not available");
        return;
      }

      console.log("Creating graph with data:", graphData.value);

      // Clear previous graph
      select(graphContainer.value).selectAll("*").remove();

      // Create SVG with explicit dimensions
      const width = Math.max(graphContainer.value.clientWidth, 800);
      const height = Math.max(graphContainer.value.clientHeight, 600);
      console.log("Container dimensions:", { width, height });

      svg = select(graphContainer.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "#ffffff");

      // Create arrow markers for different types of links
      svg
        .append("defs")
        .selectAll("marker")
        .data(["host-remote", "remote-remote", "component"])
        .enter()
        .append("marker")
        .attr("id", (d: string) => d)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", (d: string) => {
          switch (d) {
            case "host-remote":
              return "#42b983"; // Green for host-remote
            case "remote-remote":
              return "#2c3e50"; // Dark blue for remote-remote
            case "component":
              return "#666"; // Gray for component
            default:
              return "#999";
          }
        });

      // Create simulation with adjusted forces
      simulation = forceSimulation(
        graphData.value.nodes as SimulationNodeDatum[]
      )
        .force(
          "link",
          forceLink(graphData.value.links)
            .id((d: any) => d.id)
            .distance(150)
        )
        .force("charge", forceManyBody().strength(-1000))
        .force("center", forceCenter(width / 2, height / 2))
        .force("x", (d: any) => {
          // Position nodes based on their layer horizontally
          const targetX =
            d.layer === 0
              ? width * 0.2 // Host on left
              : d.layer === 1
              ? width * 0.5 // Remotes in middle
              : width * 0.8; // Components on right
          return (targetX - d.x) * 0.1; // Smooth movement to target
        })
        .force("y", (d: any) => {
          // Keep nodes vertically centered
          return (height / 2 - d.y) * 0.1;
        });

      // Create links with curved paths
      const link = svg
        .append("g")
        .selectAll("path")
        .data(graphData.value.links)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", (d: GraphLink) => {
          switch (d.type) {
            case "host-remote":
              return "#42b983"; // Green for host-remote
            case "remote-remote":
              return "#2c3e50"; // Dark blue for remote-remote
            case "component":
              return "#666"; // Gray for component
            default:
              return "#999";
          }
        })
        .attr("stroke-width", (d: GraphLink) => {
          switch (d.type) {
            case "host-remote":
              return 3;
            case "remote-remote":
              return 2;
            case "component":
              return 1;
            default:
              return 1;
          }
        })
        .attr("stroke-dasharray", (d: GraphLink) => {
          switch (d.type) {
            case "host-remote":
              return "none";
            case "remote-remote":
              return "5,5";
            case "component":
              return "2,4";
            default:
              return "none";
          }
        })
        .attr("marker-end", (d: GraphLink) => `url(#${d.type})`);

      // Create nodes
      const node = svg
        .append("g")
        .selectAll("g")
        .data(graphData.value.nodes)
        .enter()
        .append("g")
        .call(
          drag<SVGGElement, GraphNode>()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      // Add circles to nodes
      node
        .append("circle")
        .attr("r", (d: GraphNode) => {
          if (d.type === "host") return 40;
          if (d.type === "remote") return 35;
          return 25;
        })
        .attr("fill", (d: GraphNode) => {
          if (d.type === "host") return "#42b983";
          if (d.type === "remote") return "#2c3e50";
          return "#666";
        });

      // Add labels to nodes
      node
        .append("text")
        .attr("dy", -45)
        .attr("text-anchor", "middle")
        .attr("fill", "#2c3e50")
        .style("font-size", (d: GraphNode) => {
          if (d.type === "host") return "16px";
          if (d.type === "remote") return "14px";
          return "12px";
        })
        .text((d: GraphNode) => d.name);

      // Add port labels to nodes
      node
        .append("text")
        .attr("dy", 45)
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .style("font-size", "10px")
        .text((d: GraphNode) => (d.port ? `Port: ${d.port}` : ""));

      // Update positions on each tick
      simulation.on("tick", () => {
        // Update link paths
        link.attr("d", (d: any) => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dr = Math.sqrt(dx * dx + dy * dy);
          return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
        });

        // Update node positions
        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      });

      // Add layer labels
      svg
        .append("text")
        .attr("x", width * 0.2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "#2c3e50")
        .style("font-size", "14px")
        .text("Host");

      svg
        .append("text")
        .attr("x", width * 0.5)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "#2c3e50")
        .style("font-size", "14px")
        .text("Remotes");

      svg
        .append("text")
        .attr("x", width * 0.8)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .attr("fill", "#2c3e50")
        .style("font-size", "14px")
        .text("Components");

      console.log("Graph creation completed");
    };

    // Drag functions
    function dragstarted(event: any) {
      if (!event.active) simulation?.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation?.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    onMounted(() => {
      // fetchConfig();
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
      console.log("Graph data:", graphData.value);

      // Add a small delay to ensure the container is rendered
      setTimeout(() => {
        if (graphContainer.value) {
          console.log("Container found, dimensions:", {
            width: graphContainer.value.clientWidth,
            height: graphContainer.value.clientHeight,
          });
          createGraph();
        } else {
          console.error("Graph container not found");
        }
      }, 100);
    });

    onUnmounted(() => {
      simulation?.stop();
    });

    return {
      config,
      projectName,
      graphContainer,
    };
  },
});
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.graph-container {
  width: 100%;
  height: 600px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
}
</style>
