import generateMarkupAndState from "../ui/server";
import cheerio from "cheerio";

export default function(readIndex) {
	return function *(next) {
		yield next;

		let indexHtml = yield readIndex();

		/* generate the markup for this url */
		let {markup, state} = yield generateMarkupAndState(this.path, this.query);

		/* inject it into index.html */
		let $ = cheerio.load(indexHtml);
		$('div#main').append(markup);
		$('head').append(`<script>window.__ISOMORPHIC_STATE__ = ${JSON.stringify(state)}</script>`);

		this.body = $.html();
	};
}
