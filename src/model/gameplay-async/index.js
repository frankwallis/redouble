/// <reference path="../_references.d.ts" />

require("angular");
//require("$traceurRuntime");
require("../../../node_modules/traceur/bin/traceur-runtime");

export var Module: ng.IModule = angular.module("tower.model.gameplay", [ 

]);

import {rubberFactory} from "./rubber";
Module.factory("rubberFactory", rubberFactory);