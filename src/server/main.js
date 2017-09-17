import path from 'path';

import koa from 'koa';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import responseTime from 'koa-response-time';

import {isomorph, serveIndex} from './isomorph';
import createApiMiddleware from './api';

const app = koa();
const env = process.env.NODE_ENV || 'development';

app.use(responseTime()); // add header `X-Response-Time`
app.use(logger());

if (env === 'production') {
	// load production middleware
	app.use(require('koa-helmet')()); // various security headers
	app.use(require('koa-conditional-get')());
	app.use(require('koa-etag')());
	app.use(require('koa-compressor')());
}

//app.use(favicon(path.join(__dirname, '../../resources/redouble.ico')));
app.use(favicon(path.join(__dirname, '../../resources/redouble.png')));

if (env === 'development') {
	const webpackConfig = require('../../config/webpack.config.js')({ development: true });
	const webpack = require('webpack');
	const compiler = webpack(webpackConfig);

	// 1.
	app.use(isomorph());
	app.use(serveIndex('/ui/'));

	// 2.
	const hotOpts = {
		log: console.log,
		path: '/__webpack_hmr',
		heartbeat: 10 * 1000
	};
	const hot = require("koa-webpack-hot-middleware")(compiler, hotOpts);
	app.use(hot);

	// 3.
	const midOpts = {
		noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
	};
	const middleware = require("koa-webpack-dev-middleware")(compiler, midOpts);
	app.use(middleware);

	// 4.
	const api = createApiMiddleware("/api/", __dirname + "/api/");
	app.use(api);
}
else {
	app.use(isomorph());
	app.use(serveIndex('/ui/'));

	// serve cached assets from dist folder
	const cacheOpts = {maxAge: 86400000, gzip: false};
	const staticCache = require('koa-static-cache');
	app.use(staticCache(path.join(__dirname, '../../dist')), cacheOpts);
}

app.listen(8080);
console.log(`Server started on port 8080 (${env})`);
