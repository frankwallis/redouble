const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function(env = {}) {
  const hash = env.development ? '' : '.[contenthash]'

	return {
    bail: !env.development,
    mode: env.development ? 'development' : 'production',
		entry: [
      //'webpack-hot-middleware/client',
      //'lib/js/src/ui/client'
      //'src/ui/client.re'
      'client.re'
		],
    devtool: 'source-map',
    context: path.resolve(__dirname, '../'),
		output: {
			path: env.development ? path.resolve(__dirname, '../dist') : path.resolve(__dirname, '../dist'),
			publicPath: env.development ? '' : '',
			filename: env.development ? 'app.js' : 'app.[hash].js'
		},
		resolve: {
      modules: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../node_modules')
      ],
			extensions: ['.re', '.ml', '.js', '.jsx', '.css'],
		},
		module: {
			rules: [
        {
          test: /\.(re|rei|ml)$/,
          use: {
            loader: 'bs-loader',
            options: {
              cwd: path.resolve(__dirname, '../')
            }
          }
        },
        {
          test: /\.css$/,
          loader: [env.development ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: [/\.png$/, /\.svg$/, /\.gif$/, /\.(eot|ttf|woff|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/],
          loader: 'url-loader',
          options: {
            limit: 4096, // inline assets smaller than this
            name: 'assets/[name].[hash].[ext]'
          }
        }
			],
		},
    plugins: [
			new webpack.DefinePlugin({
				"process.env": {
					"__BROWSER__": true
				}
      }),
      new MiniCssExtractPlugin({
        filename: `[name]${hash}.css`
      }),
      new HtmlWebpackPlugin({
        template: './config/index-template.ejs'
			})
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6
          }
        })
      ]
    }
	}
}
