// import es6
require("babel-polyfill");
require('babel-core/register');

// chai
global.expect = require("chai").expect;
global.sinon = require("sinon");

// jsdom
var jsdom = require('jsdom');

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

global.window.addEventListener('load', function() {
    console.log('JSDOM Loaded');
});
