import express from "express";
import path from "path";

export function createDevServer(port: number = 3000) {
  const app = express();

  console.log(process.cwd());

  // Serve static files from the dev-tool/dist directory
  app.use(express.static(path.join(__dirname, "../../dev-tool/dist")));

  // Handle all routes by serving index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../dev-tool/dist/index.html"));
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Development server running at http://localhost:${port}`);
  });

  return app;
}

// Example usage:
createDevServer(3000);
