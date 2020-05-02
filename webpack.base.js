const Config = require('webpack-config').Config;
const path = require('path');
const webpack = require('webpack');

module.exports = new Config().merge({
    entry: "./src/Main.tsx",
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        globalObject: 'this'
    },

    node: {
        __dirname: true,
        fs: 'empty'
    },

    resolve: {
        modules: ['src', 'node_modules'],
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx", ".json", ".less"],
        symlinks: false
    }
});