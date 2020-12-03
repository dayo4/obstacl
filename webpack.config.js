const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")



module.exports = {
    mode: 'production',
    entry: [ './src/main.ts', './src/styles/main.css' ],
    output: {
        filename: 'obstacl.min.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'Obstacl'
    },
    //asset management
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            },
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'obstacl.min.css',
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    resolve: {
        extensions: [ '.ts', '.css' ]
    }

}