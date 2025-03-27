import express from "express";
import path from "path";
import cors from "cors";

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

      res.json(configFile);
    } catch (error) {
      console.error("Error in API:", error);
      res.status(500).json({ error: "Failed to load lidhium config" });
    }
  });

  // Get the absolute path to the dist directory
  const distPath = path.join(__dirname, "../../dev-tool/dist");
  console.log("Serving static files from:", distPath);

  // Serve static files from the build directory
  app.use(express.static(distPath));

  // Serve index.html for all other routes (SPA support)
  app.get("*", (req, res) => {
    console.log("Serving index.html for:", req.url);
    const indexPath = path.join(distPath, "index.html");
    console.log("Serving index.html from:", indexPath);
    res.sendFile(indexPath);
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access your app at http://localhost:${port}`);
    console.log(
      `API endpoint available at http://localhost:${port}/api/lidhium-config`
    );
  });

  return app;
}

// Example usage:
// createDevServer(3000);
