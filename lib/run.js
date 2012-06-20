module.exports = function(overrides) {
  if (!overrides) {
    var env = process.env.OVERRIDE_ENV;
    if (process.argv[1] == '-e') {
      env = process.argv(1, 2)[1];
    }
    if (env) {
      overrides = [];
      env.split(',').forEach(function(override) {
        overrides.push(require(override));
      });
    } else {
      throw new Exception(
          'Missing Override environment, specify it via the -e command line switch or OVERRIDE_ENV environment variable')
    }
  }

  var main = require('path').resolve(process.cwd(), process.argv[1]);

  overrides.push(function() {
    require(main);
  });

  (function next() {
    return (overrides.shift())(next);
  })();
}