const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  //the entry property is the root of the bundle and the beginning of the dependency graph
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },

  // the output of the bundled code from the entry point; best practice to put the code in dist
  output: {
    path: path.join(__dirname + "/dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              // will return the name of the file with the file extension
              name (file) {
                return "[path][name].[ext]";
              },
              // changes the assignment url by replacing the ../ from the require statement w/ /assets/
              publicPath(url) {
                return url.replace("../", "/assets/");
              }
            }
          },
          {
              loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  // plugins play an important role in giving directions to the webpack
  plugins: [
    // .ProvidePlugin() will define the $ and jquery variables to use the installed npm package
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      // outputs to an HTML file in the dist folder
      analyzerMode: "static",
    }),
  ],
  // the mode is the mode webpack should run
  mode: "development",
};
