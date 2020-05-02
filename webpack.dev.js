const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-config').Config;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = new Config().extend('webpack.base.js').merge({
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    target: 'web',
    devtool: "cheap-module-eval-source-map",

    stats: {
        warnings: false,
        modules: false
    },

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        './Main.tsx'
    ],

    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        }
    },

    output: {
        pathinfo: false,
        publicPath: '/',
        path: path.resolve(__dirname, '../dist'),
        filename: 'flappyspace.[hash].js'
    },

    optimization: {
        minimize: false,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },

    watchOptions: {
        ignored: /node_modules/
    },

    devServer: {
        hot: true,
        host: 'localhost',
        port: 3333,
        disableHostCheck: true,
        contentBase: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        historyApiFallback: true,
        stats: {
            all: false,
            env: true,
            builtAt: true,
            modules: true,
            maxModules: 0,
            errors: true,
            colors: true,
            warnings: true,
            timings: true,
            moduleTrace: true,
            errorDetails: true,
        }
    },

    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
                'react-hot-loader/webpack',
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        experimentalWatchApi: true,
                    }
                }
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