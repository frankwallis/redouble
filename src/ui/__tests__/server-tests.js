import generateMarkupAndState from "../server.jsx";

describe('generateMarkup', () => {

	it('generates markup for /about', (done) => {
		return generateMarkupAndState("/about", "")
			.then(({markup, state}) => {
				expect(markup).toContain("Welcome to Redouble!");
				expect(state).toBeDefined();
				done();
			})
			.catch(done.fail);
	});

	it('generates markup for /settings', (done) => {
		return generateMarkupAndState("/settings", "")
			.then(({markup, state}) => {
				expect(markup).toContain(`<h3 class="settings-player-header"`);
				expect(state).toBeDefined();
				done();
			})
			.catch(done.fail);
	});

	it('generates markup for /', (done) => {
		return generateMarkupAndState("/", "")
			.then(({markup, state}) => {
				expect(markup).toContain(`<div class="bridge-table"`);
				expect(state).toBeDefined();
				done();
			})
			.catch(done.fail);
	});

});
