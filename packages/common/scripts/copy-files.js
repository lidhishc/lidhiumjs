const fs = require("fs");
const path = require("path");

// Create dist/vue directory if it doesn't exist
const vueDistDir = path.join(__dirname, "../dist/vue");
if (!fs.existsSync(vueDistDir)) {
  fs.mkdirSync(vueDistDir, { recursive: true });
}

// Copy Vue files
const vueSrcDir = path.join(__dirname, "../src/vue");
fs.readdirSync(vueSrcDir).forEach((file) => {
  if (file.endsWith(".vue")) {
    fs.copyFileSync(path.join(vueSrcDir, file), path.join(vueDistDir, file));
  }
});
