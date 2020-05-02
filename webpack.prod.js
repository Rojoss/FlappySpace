const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-config').Config;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = new Config().extend('webpack.base.js').merge({
    context: path.resolve(__dirname, './src'),
    mode: 'production',
    target: 'web',

    stats: {
        warnings: false,
        modules: false
    },

    entry: [
        './Main.tsx'
    ],

    output: {
        pathinfo: false,
        publicPath: '/',
        path: path.resolve(__dirname, 'build'),
        filename: 'flappyspace.[hash].js'
    },

    watchOptions: {
        ignored: /node_modules/
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                'ts-loader'
            ],
        },
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ],
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                'file-loader?name=./imgs/[hash].[ext]',
            ],
        },
        ],
    },

    plugins: [
        // Generate minified HTML page from template with all CSS/JS imports.
        new HtmlWebpackPlugin({
            title: 'Flappy Space',
            template: path.resolve(__dirname, 'public/index.html'),
        }),

        // Copy all assets to distribution folder.
        new CopyWebpackPlugin([{
            from: '../assets',
            to: 'assets'
        },
        {
            from: '../public'
        },
        ]),

        // enable HMR globally
        new webpack.HotModuleReplacementPlugin(),

        // prints more readable module names in the browser console on HMR updates
        new webpack.NamedModulesPlugin(),
    ],
});