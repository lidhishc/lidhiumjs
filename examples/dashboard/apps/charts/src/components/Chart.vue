<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const chartRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!chartRef.value) return;

  // Sample data
  const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 25 },
    { month: "Apr", value: 60 },
    { month: "May", value: 40 },
    { month: "Jun", value: 55 },
  ];

  // Set dimensions
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  // Create SVG
  const svg = d3
    .select(chartRef.value)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create scales
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.month))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) || 0])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Add bars
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.month) || 0)
    .attr("y", (d) => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", (d) => y(0) - y(d.value))
    .attr("fill", "#4F46E5");

  // Add axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
});
</script>

<template>
  <div class="chart-container">
    <div class="chart-container-inner">
      <h1 class="text-2xl font-bold ml-4">Chart from charts app</h1>
      <div ref="chartRef" class="chart"></div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-container-inner {
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
}

.chart {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
