import generateMarkup from "../server.jsx";

describe('generateMarkup', () => {

	it('generates markup for /about', (cb) => {
		return generateMarkup("/about", "")
			.then((html) => {
				expect(html).toContain("Welcome to Tower!");
				cb();
			});
	});

	it('generates markup for /settings', (cb) => {
		return generateMarkup("/settings", "")
			.then((html) => {
				expect(html).toContain(`<h3 class="settings-player-header"`);
				cb();
			});
	});

	it('generates markup for /', (cb) => {
		return generateMarkup("/", "")
			.then((html) => {
				expect(html).toContain(`<div class="bridge-table"`);
				cb();
			});
	});

});
