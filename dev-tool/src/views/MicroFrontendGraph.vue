<template>
  <div class="app">
    <h1>{{ projectName }}</h1>
    <div class="legend">
      <h3>Legend</h3>
      <div class="legend-section">
        <h4>Node Types</h4>
        <div class="legend-item">
          <div class="legend-circle host"></div>
          <span>Host App - Main container application</span>
        </div>
        <div class="legend-item">
          <div class="legend-circle remote"></div>
          <span>Remote App - Micro-frontend application</span>
        </div>
        <div class="legend-item">
          <div class="legend-circle component"></div>
          <span>Component - Exposed component from an app</span>
        </div>
      </div>
      <div class="legend-section">
        <h4>Connection Types</h4>
        <div class="legend-item">
          <div class="legend-line host-remote"></div>
          <span>Host-Remote - Host app importing remote app</span>
        </div>
        <div class="legend-item">
          <div class="legend-line remote-remote"></div>
          <span>Remote-Remote - Remote app depending on another remote</span>
        </div>
        <div class="legend-item">
          <div class="legend-line component"></div>
          <span>Component - Component exposed by an app</span>
        </div>
      </div>
      <div class="legend-info">
        <p>💡 Tip: Drag nodes to rearrange the graph</p>
      </div>
    </div>
    <div ref="graphContainer" class="graph-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, onUnmounted } from "vue";
import * as d3 from "d3";
import { testConfig } from "@/utils/Static";

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
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  vx?: number;
  vy?: number;
  index?: number;
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

    const fetchConfig = async () => {
      try {
        console.log("Fetching config from:", "/api/lidhium-config");
        const response = await fetch("/api/lidhium-config");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received config:", data);

        config.value = data;
        projectName.value = data.project;
      } catch (error) {
        console.error("Failed to fetch lidhium config:", error);
      }
    };

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
        .forceSimulation<GraphNode>(graphData.value.nodes)
        .force(
          "link",
          d3
            .forceLink<GraphNode, GraphLink>(graphData.value.links)
            .id((d: GraphNode) => d.id)
            .distance((d: GraphLink) => {
              if (d.type === "host-remote") return 250;
              if (d.type === "remote-remote") return 200;
              return 150;
            })
            .strength(0.7)
        )
        .force("charge", d3.forceManyBody<GraphNode>().strength(-1200))
        .force("x", d3.forceX<GraphNode>(width / 2).strength(0.05))
        .force("y", d3.forceY<GraphNode>(height / 2).strength(0.05))
        .force(
          "collision",
          d3
            .forceCollide<GraphNode>()
            .radius((d: GraphNode) => {
              if (d.type === "host") return 100;
              if (d.type === "remote") return 80;
              return 60;
            })
            .strength(0.8)
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
        .attr("stroke", (d: GraphLink) => {
          switch (d.type) {
            case "host-remote":
              return "#4CAF50";
            case "remote-remote":
              return "#2c3e50";
            default:
              return "#757575";
          }
        })
        .attr("stroke-width", (d: GraphLink) => {
          if (d.type === "host-remote") return 2;
          if (d.type === "remote-remote") return 1.5;
          return 1;
        })
        .attr("fill", "none")
        .attr("marker-end", (d: GraphLink) => `url(#${d.type})`);

      // Create nodes
      const node = svg
        .append("g")
        .selectAll("g")
        .data(graphData.value.nodes)
        .join("g");

      // Add node circles
      node
        .append("circle")
        .attr("r", (d: GraphNode) => {
          if (d.type === "host") return 60;
          if (d.type === "remote") return 50;
          return 40;
        })
        .style("fill", (d: GraphNode) => {
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
        .style("font-size", (d: GraphNode) => {
          if (d.type === "host") return "16px";
          if (d.type === "remote") return "14px";
          return "12px";
        })
        .style("font-weight", "500")
        .style("font-family", "system-ui, -apple-system, sans-serif")
        .style("pointer-events", "none")
        .text((d: GraphNode) => d.name);

      // Add port labels inside nodes
      node
        .append("text")
        .attr("dy", 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .style("font-size", (d: GraphNode) => {
          if (d.type === "host") return "12px";
          return "11px";
        })
        .style("font-family", "system-ui, -apple-system, sans-serif")
        .style("font-weight", "400")
        .style("opacity", "0.9")
        .style("pointer-events", "none")
        .text((d: GraphNode) => `Port: ${d.port}`);

      // Update path generation
      simulation.on("tick", () => {
        // Contain nodes within bounds
        graphData.value.nodes.forEach(
          (d: GraphNode & { x?: number; y?: number }) => {
            d.x = Math.max(padding, Math.min(width - padding, d.x || 0));
            d.y = Math.max(padding, Math.min(height - padding, d.y || 0));
          }
        );

        // Update link paths
        link.attr("d", (d: any) => {
          const source = d.source as GraphNode;
          const target = d.target as GraphNode;

          // Calculate node radius
          const sourceRadius =
            source.type === "host" ? 60 : source.type === "remote" ? 50 : 40;
          const targetRadius =
            target.type === "host" ? 60 : target.type === "remote" ? 50 : 40;
          // Calculate the total distance
          const dx =
            ((target as GraphNode & { x?: number }).x || 0) -
            ((source as GraphNode & { x?: number }).x || 0);
          const dy =
            ((target as GraphNode & { y?: number }).y || 0) -
            ((source as GraphNode & { y?: number }).y || 0);
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance === 0) return "";

          // Calculate the unit vector
          const unitX = dx / distance;
          const unitY = dy / distance;
          // Calculate start and end points
          const startX =
            ((source as GraphNode & { x?: number }).x || 0) +
            unitX * sourceRadius;
          const startY =
            ((source as GraphNode & { y?: number }).y || 0) +
            unitY * sourceRadius;
          const endX =
            ((target as GraphNode & { x?: number }).x || 0) -
            unitX * (targetRadius + 5);
          const endY =
            ((target as GraphNode & { y?: number }).y || 0) -
            unitY * (targetRadius + 5);

          return `M${startX},${startY}L${endX},${endY}`;
        });

        node.attr(
          "transform",
          (d: GraphNode & { x?: number; y?: number }) =>
            `translate(${d.x || 0},${d.y || 0})`
        );
      });

      // Add drag behavior
      node.call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on(
            "start",
            (event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              const d = event.subject;
              d.fx = d.x;
              d.fy = d.y;
            }
          )
          .on(
            "drag",
            (event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>) => {
              const d = event.subject;
              d.fx = event.x;
              d.fy = event.y;
            }
          )
          .on(
            "end",
            (event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>) => {
              if (!event.active) simulation.alphaTarget(0);
              const d = event.subject;
              d.fx = null;
              d.fy = null;
            }
          )
      );

      console.log("Graph initialization complete");
    };

    // Add window resize handler
    const handleResize = () => {
      createGraph();
    };

    onMounted(async () => {
      await fetchConfig();

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

.legend {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;
  position: absolute;
  top: 100px;
  right: 24px;
  max-width: 320px;
  z-index: 1000;
}

.legend h3 {
  color: #2c3e50;
  margin: 0 0 16px;
  font-size: 18px;
  font-weight: 600;
}

.legend h4 {
  color: #2c3e50;
  margin: 16px 0 8px;
  font-size: 14px;
  font-weight: 600;
}

.legend-section {
  margin-bottom: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
  font-size: 13px;
  color: #2c3e50;
}

.legend-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 12px;
  border: 2px solid #ffffff;
}

.legend-circle.host {
  background-color: #4caf50;
}

.legend-circle.remote {
  background-color: #2c3e50;
}

.legend-circle.component {
  background-color: #757575;
}

.legend-line {
  width: 24px;
  height: 2px;
  margin-right: 12px;
}

.legend-line.host-remote {
  background-color: #4caf50;
  height: 2px;
}

.legend-line.remote-remote {
  background-color: #2c3e50;
  height: 1.5px;
}

.legend-line.component {
  background-color: #757575;
  height: 1px;
}

.legend-info {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.legend-info p {
  margin: 8px 0;
  font-size: 13px;
  color: #666;
}
</style>
