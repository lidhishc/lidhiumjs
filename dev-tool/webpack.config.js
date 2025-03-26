const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  plugins: [
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Only compress files > 10kb
      minRatio: 0.8, // Only compress if compression ratio is better than 0.8
    }),
  ],
};
