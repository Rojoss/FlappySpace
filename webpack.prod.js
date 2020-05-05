const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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

    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.less', '.ts', '.tsx', '.js', '.jsx'],
        alias: {
            assets: path.resolve(__dirname, 'assets'),
        }
    },

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
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name]-[contenthash].[ext]',
                    }
                }
            ]
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
            from: '../assets/fonts',
            to: 'assets/fonts'
        },
        {
            from: '../assets/sounds',
            to: 'assets/sounds'
        },
        {
            from: '../assets/spritesheet.json',
            to: 'assets/'
        },
        {
            from: '../assets/spritesheet.png',
            to: 'assets/'
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
};