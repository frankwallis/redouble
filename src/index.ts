/// <reference path="./_references.d.ts" />

require("angular.js");

import ui = require("./ui/index");
import model = require("./model/index");

export var Module: ng.IModule = angular.module("tower", [ 
    ui.Module.name, model.Module.name
]);
