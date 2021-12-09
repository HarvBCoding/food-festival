const path = require("path");
const webpack = require("webpack");

module.exports = {
    //the entry property is the root of the bundle and the beginning of the dependency graph
    entry: './assets/js/script.js',
    // the output of the bundled code from the entry point; best practice to put the code in dist
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    // plugins play an important role in giving directions to the webpack
    plugins: [
        // .ProvidePlugin() will define the $ and jquery variables to use the installed npm package
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ],
    // the mode is the mode webpack should run
    mode: 'development'
}