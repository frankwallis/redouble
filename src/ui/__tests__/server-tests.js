import generateMarkupAndState from "../server";

describe('generateMarkup', () => {

	it('generates markup for /ui/about', () => {
		return generateMarkupAndState("/ui/about", "")
			.then(({markup, state}) => {
				expect(markup).to.have.string(">About Redouble</h3>");
				expect(state).to.be.defined;
			});
	});

	it('generates markup for /ui/settings', () => {
		return generateMarkupAndState("/ui/settings", "")
			.then(({markup, state}) => {
				expect(markup).to.have.string(`<h3 class="settings-player-header"`);
				expect(state).to.be.defined;
			});
	});

	it('generates markup for /', () => {
		return generateMarkupAndState("/", "")
			.then(({markup, state}) => {
				expect(markup).to.have.string(`<div class="bridge-table"`);
				expect(state).to.be.defined;
			});
	});

});
