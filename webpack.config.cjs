const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production", // Use "development" for debugging
  entry: {
    content: "./src/content.ts",
    background: "./src/background.ts",
    main: "./src/main.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js", // Output files match entry point names
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"], // Resolve .ts and .js files
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Transpile TypeScript files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/, // Match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use Babel to transpile JavaScript/JSX
          options: {
            presets: [
              "@babel/preset-env", // Transpile modern JS to older syntax
              "@babel/preset-react", // Enable JSX transpilation
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  optimization: {
    splitChunks: false, // Prevent Webpack from splitting chunks
  },
  target: "web", // Target browsers
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true,
      chunks: ["main"],
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
    new MiniCssExtractPlugin(),
  ],
};
