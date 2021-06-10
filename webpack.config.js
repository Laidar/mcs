const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const pug = {
    test: /\.pug$/,
    loader: 'pug-loader'
};

const sass = {
    test: /\.(sa|sc|c)ss$/,
    use: [{loader: MiniCssExtractPlugin.loader},
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        autoprefixer({
                            overrideBrowserslist: ['ie >= 8', 'last 4 version'],
                            grid: true
                        })
                    ]
                },
            }
        },
        'sass-loader']
};

const images = {
    test: /\.(svg|png|jpg|gif)$/,
    use: {
        loader: 'file-loader',
        options: {
            name: './assets/img/[name].[ext]',
            publicPath: (url) => {
                return url.replace(/assets/, '..')
            },
        }
    }
}

const fonts = {
    test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
    use: {
        loader: 'file-loader',
        options: {
            name: 'assets/fonts/[folder]/[name].[ext]',
            publicPath: function(url) {
                return url.replace(/assets/, '..')
            },
        }
    }
}

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'assets/scripts/index.bundle.js',
    },
    module: {
        rules: [pug, sass, images, fonts]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
        }),
        new CopyWebpackPlugin({patterns: [{from: "./src/assets/img/", to: "./assets/img"}]}),
        new MiniCssExtractPlugin({
            filename: 'assets/styles/styles.css',
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] }
        })
    ]
}