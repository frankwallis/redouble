import generateMarkup from "../ui/server";
import cheerio from "cheerio";

export default function(readIndex) {
	return function *(next) {
		yield next;

		let indexHtml = yield readIndex();

		/* generate the markup for this url */
		let markup = yield generateMarkup(this.path, this.query);

		/* inject it into index.html */
		let $ = cheerio.load(indexHtml);
		$('div#main').append(markup);
		this.body = $.html();
	};
}
