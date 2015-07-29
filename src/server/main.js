import path from 'path';

import koa from 'koa';
import logger from 'koa-logger';
import favicon from 'koa-favicon';
import responseTime from 'koa-response-time';

import isomorph from './isomorph';

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

app.use(favicon(path.join(__dirname, '../../resources/cards.ico')));

if (env === 'development') {
	app.use(isomorph());
	// proxy assets from webpack dev server
	let proxy = require('koa-proxy');
	app.use(proxy({host: 'http://0.0.0.0:3001'}));
}
else {
	app.use(isomorph());
	// serve assets from dist folder
	let serveStatic = require('koa-static');
	app.use(serveStatic(path.join(__dirname, '../../dist')));
}

app.listen(8080);
console.log(`Server started on port 8080 (${env})`);
