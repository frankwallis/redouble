import generateMarkup from "../server.jsx";

describe('generateMarkup', () => {

	it('generates markup for /about', (done) => {
		return generateMarkup("/about", "")
			.then((html) => {
				expect(html).toContain("Welcome to Tower!");
				done();
			})
			.catch(done.fail);
	});

	it('generates markup for /settings', (done) => {
		return generateMarkup("/settings", "")
			.then((html) => {
				expect(html).toContain(`<h3 class="settings-player-header"`);
				done();
			})
			.catch(done.fail);
	});

	it('generates markup for /', (done) => {
		return generateMarkup("/", "")
			.then((html) => {
				expect(html).toContain(`<div class="bridge-table"`);
				done();
			})
			.catch(done.fail);
	});

});
