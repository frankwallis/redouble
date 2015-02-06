System.config({
  "paths": {
    "*": "./",
    "src/*": "src/*",
    "src/model/gameplay-async/index.js": "src/model/gameplay-async/index.js",
    "src/model/gameplay-async/rubber.js": "src/model/gameplay-async/rubber.js",
    "src/model/gameplay-async/board.js": "src/model/gameplay-async/board.js",
    "src/model/gameplay-async/bidding.js": "src/model/gameplay-async/bidding.js",
    "src/model/gameplay-async/cardplay.js": "src/model/gameplay-async/cardplay.js",
    "src/model/gameplay-async/utils.js": "src/model/gameplay-async/utils.js",
    "src/model/gameplay-async/*": "src/model/gameplay-async/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "typescript/bin/*.d.ts": "jspm_packages/npm/typescript@1.4.1/bin/*.d.ts",
    "tower/*": "src/*.js"
  },
  "traceurOptions": {
    "asyncFunctions": true,
    "types": true,
    "atscript": true,
    "memberVariables": true,
    "annotations": true,
    "experimental": false
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.10",
    "angular-material": "github:angular/bower-material@0.7.0",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "hammer": "github:hammerjs/hammer.js@2.0.4",
    "html": "github:systemjs/plugin-text@0.0.2",
    "css": "github:systemjs/plugin-css@0.1.0",
    "plugin-css": "github:systemjs/plugin-css@0.1.0",
    "plugin-text": "github:systemjs/plugin-text@0.0.2",
    "plugin-typescript@0.5.5": "github:frankwallis/plugin-typescript@0.5.5",
    "ts": "github:frankwallis/plugin-typescript@0.5.5",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-angular-animate@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-angular-aria@1.3.10": {
      "angular": "github:angular/bower-angular@1.3.10"
    },
    "github:angular/bower-material@0.7.0": {
      "angular": "github:angular/bower-angular@1.3.10",
      "angular-animate": "github:angular/bower-angular-animate@1.3.10",
      "angular-aria": "github:angular/bower-angular-aria@1.3.10",
      "css": "github:systemjs/plugin-css@0.1.0",
      "hammer": "github:hammerjs/hammer.js@2.0.4"
    },
    "github:frankwallis/plugin-typescript@0.5.5": {
      "convert-source-map": "npm:convert-source-map@0.4.1",
      "path": "npm:path@0.11.14",
      "requires": "npm:requires@1.0.2",
      "typescript": "npm:typescript@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.0.1"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.0"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.0.1": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.4",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:convert-source-map@0.4.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.1",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:path@0.11.14": {
      "fs": "github:jspm/nodelibs-fs@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:typescript@1.4.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.1",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

