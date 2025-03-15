<script lang="ts">
export default {
  name: "App-Host",
  data() {
    return {
      toolName: "CLI Tool",
      description:
        "A powerful command-line interface tool for modern development",
    };
  },
};
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>{{ toolName }}</h1>
      <p class="tagline">{{ description }}</p>
    </header>

    <main class="main-content">
      <div class="feature-grid">
        <div class="feature-card">
          <i class="fas fa-bolt"></i>
          <h3>Lightning Fast</h3>
          <p>Optimized for speed and efficiency</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-shield-alt"></i>
          <h3>Secure</h3>
          <p>Built with security in mind</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-code"></i>
          <h3>Developer Friendly</h3>
          <p>Intuitive commands and clear documentation</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 2rem;
}

.header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.2rem;
  color: #34495e;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
