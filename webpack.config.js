const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = {
  //the entry property is the root of the bundle and the beginning of the dependency graph
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  devServer: {
      static: {
          directory: path.join(__dirname, ".")
      }
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
    // create a new manifest using webpackpwamanifest
    new WebpackPwaManifest({
        name: "Food Event",
        short_name: "Foodies",
        description: "An app that allowd you to view upcoming food events.",
        // specifies the homepage for the PWA relative to the location of the manifest file
        start_url: "../index.html",
        background_color: "#01579b",
        theme_color: "#ffffff",
        // fingerprints is specific to the plugin, tells webpack whether or not it should 
        // generate unique footprints everytime a new manifest is generated
        fingerprints: false,
        // inject property determines whether the link to maidest.json is added to the html
        inject: false,
        icons: [{
            // path to the icon image used
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            // the src image will be created in the specified sizes
            sizes: [96, 128, 192, 256, 384, 512],
            // designates where the icons will be sent after creation of web manifest
            destination: path.join("assets", "icons")
        }]
    })
  ],
  // the mode is the mode webpack should run
  mode: "development",
};
