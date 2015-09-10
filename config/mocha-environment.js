// import es6
require('babel/register');

// chai
global.expect = require("chai").expect;
global.sinon = require("sinon");

// jsdom
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.navigator = global.window.navigator;
