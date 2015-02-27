var babel = require('babel');

module.exports = {
    process: function(src) {
      var result = babel.transform(src, { optional: ["reactCompat"] });
      //for (var prop in result)
      //  console.log(prop + ': ' + result[prop])
      return result.code;
    }
};
