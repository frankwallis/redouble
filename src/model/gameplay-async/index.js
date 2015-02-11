/// <reference path="../_references.d.ts" />

//require("$traceurRuntime");
//require("../../../node_modules/traceur/bin/traceur-runtime.js");

import angular from "angular";

export var Module: ng.IModule = angular.module("tower.model.gameplay", [

]);

import {rubberFactory} from "./rubber.js";
Module.factory("rubberFactory", rubberFactory);
