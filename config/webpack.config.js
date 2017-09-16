var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env = {}) {
  var localIdentName = env.development ?  '[path]-[local]-[hash:base64:5]' : '[hash:base64]';

	return {
		entry: [
      //'webpack-hot-middleware/client',
      //'lib/js/src/ui/client'
      //'src/ui/client.re'
      'ui/client.re'
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
					use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?resolve-url&localIdentName=' + localIdentName }),
				},
				{
					test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'url-loader?limit=8192'
				},
				{
					test: /\.png$/,
					use: "url-loader?limit=100000&mimetype=image/png",
				},
				{
					test: /\.svg$/,
					use: "url-loader?limit=100000&mimetype=image/svg+xml",
				},
				{
					test: /\.gif$/,
					use: "url-loader?limit=100000&mimetype=image/gif",
				},
				{
					test: /\.jpg$/,
					use: "file-loader",
				},
			],
		},
    plugins: env.development ? [
			new webpack.DefinePlugin({
				"process.env": {
					"__BROWSER__": true
				}
      }),
      new ExtractTextPlugin({ filename: "app.[hash].css", allChunks: true }),
			new HtmlWebpackPlugin({
				template: './config/index-template.html',
			}),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
		] : [
			// Important to keep React file size down
			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify("production"),
					"__BROWSER__": true
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
			}),
			new ExtractTextPlugin({ filename: "app.[hash].css", allChunks: true }),
			new HtmlWebpackPlugin({
				template: './config/index-template.html',
				production: true,
			}),
		]
	};
};
