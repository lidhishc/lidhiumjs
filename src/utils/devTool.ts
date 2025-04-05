import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";

const app = express();

export function createDevServer(configFile: any, port: number = 3000) {
  // Enable CORS
  app.use(cors());

  // Add logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // API endpoint to get lidhium config - This must come BEFORE static file serving
  app.get("/api/lidhium-config", (req, res) => {
    console.log("API endpoint hit");
    try {
      // Set proper content type and CORS headers
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");

      // Read the latest config file
      const configPath = path.join(process.cwd(), "lidhium.config.json");
      const latestConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));

      res.json(latestConfig);
    } catch (error) {
      console.error("Error in API:", error);
      res.status(500).json({ error: "Failed to load lidhium config" });
    }
  });

  // Get the absolute path to the dist directory
  const distPath = path.join(__dirname, "../../dev-tool/dist");

  // Serve static files from the build directory
  app.use(express.static(distPath));

  // Serve index.html for all other routes (SPA support)
  app.get("*", (req, res) => {
    console.log("Serving index.html for:", req.url);
    const indexPath = path.join(distPath, "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });

  // Watch for config file changes
  const configPath = path.join(process.cwd(), "lidhium.config.json");
  fs.watch(configPath, (eventType, filename) => {
    if (eventType === "change") {
      console.log(
        "Config file changed, updates will be reflected in next API call"
      );
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access your app at http://localhost:${port}`);
  });

  return app;
}

// Example usage:
// createDevServer(3000);
