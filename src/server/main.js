import path from 'path';
//import debug from 'debug';

import koa from 'koa';
import mount from 'koa-mount';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import staticCache from 'koa-static-cache';
import responseTime from 'koa-response-time';

import fs from 'co-fs'
import isomorph from './isomorph';

const app = koa();
const env = process.env.NODE_ENV || 'development';

app.use(responseTime()); // add header `X-Response-Time`
app.use(logger());

if (env === 'production') {
	// set debug env to `koa` only
	// must be set programmaticaly for windows
	//debug.enable('koa');

	// load production middleware
	app.use(require('koa-helmet')()); // various security headers
	app.use(require('koa-conditional-get')());
	app.use(require('koa-etag')());
	app.use(require('koa-compressor')());
}

// if (env === 'development') {
// 	// set debug env, must be programmaticaly for windows
// 	debug.enable('dev,koa');
// 	// log when process is blocked
// 	require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`));
// }

app.use(favicon(path.join(__dirname, '../../resources/cards.ico')));

const cacheOpts: Object = {maxAge: 86400000, gzip: false};

// Proxy assets to webpack development server in development mode
if (env === 'development') {
	//const webpackConfig: Object = require('../../config/webpack.config');
	//app.use(mount('/', require('koa-proxy')({host: `http://0.0.0.0:${3000}`})));
	app.use(mount('/', staticCache(path.join(__dirname, '../../dist'), cacheOpts)));
	app.use(isomorph(() => fs.readFile(path.join(__dirname, '../../dist/index.html'))));
}
else {
	app.use(mount('/', staticCache(path.join(__dirname, '../../dist'), cacheOpts)));
	app.use(isomorph(() => fs.readFile(path.join(__dirname, '../../dist/index.html'))));
}

app.listen(8080);

// Tell parent process koa-server is started
if (process.send) process.send('online');
console.log('Application started on port 8080');
