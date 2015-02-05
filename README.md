# tower #

contract bridge angular web app
built with SystemJS, JSPM, and plugin-typescript

### How do I get set up? ###

* npm install
* jspm install
* gulp serve 

### Issues

This application uses [plugin-typescript](http://www.github.com/frankwallis/plugin-typescript) which uses the TypeScript LanguageServices API. Unfortunately there is an [issue](https://github.com/Microsoft/TypeScript/issues/1812) in TypeScript 1.4.1 where const enums are not correctly output in the generated js. To fix that you need to use a copy of typescriptServices.js from master.

