var webpackConfig = require('./webpack.config.js');

module.exports = function(options) {
	var karmaConfig = {
		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		files: [
			// This shim adds .bind to PhantomJS
			'./phantomjs-shim.js',
			'../src/**/__tests__/*.js'
		],

		preprocessors: {
			'../src/**/__tests__/*.js': ['webpack']
		},

		webpackMiddleware: {
			noInfo: true,
		},

		reporters: ['mocha'],

		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-mocha-reporter',
		],
	};

	if (options.coverage) {
		// Needs to load first to prevent linting issues
		webpackConfig.module.preLoaders = [{
		 	test: /\.jsx?$/,
		 	exclude: /(__tests__|node_modules)/,
		 	loader: 'isparta-instrumenter-loader',
		}].concat(webpackConfig.module.preLoaders);

		karmaConfig.plugins.push('karma-coverage');

		karmaConfig.coverageReporter = {
	 		dir: '../coverage',
	 		reporters: options.coverageReporters || [
		 		{ type: 'text' },
		 		{ type: 'html' },
	 		],
		};

		karmaConfig.reporters.push('coverage');
	}

	if (options.notify) {
		karmaConfig.reporters.push('notify');
		karmaConfig.plugins.push('karma-notify-reporter');
	}

	karmaConfig.webpack = webpackConfig;

	return karmaConfig;
};
