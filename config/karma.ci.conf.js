var karmaFactory = require('./karma-config-builder.js');

module.exports = function(config) {
	config.set(karmaFactory({
		coverage: true,
		coverageReporters: [
			{ type: 'text' },
		],
	}));
};
