const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlProdPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./src/assets/images/favicon.ico",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
  }
});
const htmlDevPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});
const envProdPlugin = new webpack.DefinePlugin({
  "process.env.ENV": JSON.stringify("production"),
  "process.env.API_URL": JSON.stringify(""),
  "process.env.VERSION": JSON.stringify(require("../package.json").version)
});
const envDevPlugin = new webpack.DefinePlugin({
  "process.env.ENV": JSON.stringify("development"),
  "process.env.API_URL": JSON.stringify(""),
  "process.env.VERSION": JSON.stringify(require("../package.json").version)
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: "css/[name].css",
  chunkFilename: "css/[name].[contenthash].css"
});

const manifestPlugin = new WebpackPwaManifest({
  name: "",
  short_name: "",
  description: "!",
  background_color: "#ffffff",
  theme_color: "#ffffff",
  crossorigin: "use-credentials", //can be null, use-credentials or anonymous
  icons: [
    {
      src: path.resolve("src/assets/images/icon-512x512.png"),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      destination: path.join("icons")
    },
    {
      src: path.resolve("src/assets/images/icon-512x512.png"),
      size: "192x192", // multiple sizes
      destination: path.join("icons"),
      ios: true
    }
  ],
  fingerprints: false,
  inject: true,
  ios: true
});

const cleanPlugin = new CleanWebpackPlugin();

/*const swPlugin = new GenerateSW({
  swDest: "sw.js",
  clientsClaim: true,
  skipWaiting: true
});*/
const swPlugin = new InjectManifest({
  swSrc: "./src/sw.js"
});

const copyPlugin = new CopyPlugin([{ from: "./src/robots.txt", to: "./" }]);

exports.prodPlugins = [
  htmlProdPlugin,
  manifestPlugin,
  swPlugin,
  copyPlugin,
  envProdPlugin,
  cssPlugin,
  cleanPlugin
];

exports.devPlugins = [htmlDevPlugin, envDevPlugin, cssPlugin, cleanPlugin];
