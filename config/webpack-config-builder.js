var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

function extractForProduction(loaders) {
	return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function(options) {
	options.lint = fs.existsSync(__dirname + '/../.eslintrc') && (options.lint !== false);

	var localIdentName = options.production ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
	var cssLoaders = 'style!css?localIdentName=' + localIdentName + '!autoprefixer?browsers=last 2 versions';
	var scssLoaders = cssLoaders + '!sass';
	var sassLoaders = scssLoaders + '?indentedSyntax=sass';

	if (options.production) {
		cssLoaders = extractForProduction(cssLoaders);
		sassLoaders = extractForProduction(sassLoaders);
		scssLoaders = extractForProduction(scssLoaders);
	}

	var jsLoaders = options.production  ? ['babel'] : ['react-hot', 'babel'];

	return {
		entry: [
			'webpack-hot-middleware/client',
			'./src/ui/client.js'
		],
		debug: !options.production,
		colors: true,
		devtool: options.devtool,
		output: {
			path: options.production ? './dist' : '/',
			publicPath: options.production ? '' : '/',
			filename: options.production ? 'app.[hash].js' : 'app.js',
		},
		module: {
			preLoaders: options.lint ? [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'eslint',
				},
			] : [],
			loaders: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loaders: jsLoaders
				},
				{
					test: /\.css$/,
					loader: cssLoaders,
				},
				{
					test: /\.sass$/,
					loader: sassLoaders,
				},
				{
					test: /\.scss$/,
					loader: scssLoaders,
				},
				{
					test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'url-loader?limit=8192'
				},
				{
					test: /\.png$/,
					loader: "url?limit=100000&mimetype=image/png",
				},
				{
					test: /\.svg$/,
					loader: "url?limit=100000&mimetype=image/svg+xml",
				},
				{
					test: /\.gif$/,
					loader: "url?limit=100000&mimetype=image/gif",
				},
				{
					test: /\.jpg$/,
					loader: "file",
				},
			],
		},
		resolve: {
			extensions: ['', '.js', '.jsx', '.sass', '.scss', '.css'],
		},
		plugins: options.production ? [
			// Important to keep React file size down
			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify("production"),
					"__BROWSER__": true
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
				},
			}),
			new ExtractTextPlugin("app.[hash].css"),
			new HtmlWebpackPlugin({
				template: './config/index-template.html',
				production: true,
			}),
		] : [
			new webpack.DefinePlugin({
				"process.env": {
					"__BROWSER__": true
				}
			}),
			new HtmlWebpackPlugin({
				template: './config/index-template.html',
			}),
			new webpack.optimize.OccurenceOrderPlugin(),
    		new webpack.HotModuleReplacementPlugin(),
    		new webpack.NoErrorsPlugin()
		],
	};
};
