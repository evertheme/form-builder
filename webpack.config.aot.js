const ngtools = require('@ngtools/webpack');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./config/helpers');
module.exports = {
    devtool: 'source-map',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main-aot.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: 'src/dist',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig-aot.json'
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: false // workaround for ng2
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        rules: [
            {
                test: /\.css$/, include: helpers.root('src', 'app'), loader: 'raw-loader'
            },
            {
                test: /\.css$/, exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.ts$/, loader: '@ngtools/webpack' }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};
