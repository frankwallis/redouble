import generateMarkupAndState from "../server.jsx";

describe('generateMarkup', () => {

	it('generates markup for /about', (done) => {
		return generateMarkupAndState("/about", "")
			.then(({markup, state}) => {
				expect(markup).to.have.string("Welcome to Redouble!");
				expect(state).to.be.defined;
				done();
			})
			.catch(done);
	});

	it('generates markup for /settings', (done) => {
		return generateMarkupAndState("/settings", "")
			.then(({markup, state}) => {
				expect(markup).to.have.string(`<h3 class="settings-player-header"`);
				expect(state).to.be.defined;
				done();
			})
			.catch(done);
	});

	it('generates markup for /', (done) => {
		return generateMarkupAndState("/", "")
			.then(({markup, state}) => {
				expect(markup).to.have.string(`<div class="bridge-table"`);
				expect(state).to.be.defined;
				done();
			})
			.catch(done);
	});

});
