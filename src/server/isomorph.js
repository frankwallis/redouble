import path from "path";
import generateMarkupAndState from "../ui/server";
import cheerio from "cheerio";
import rawBody from "raw-body";

export default function() {
	return function *(next) {
		yield next;

		// TODO handle routes
		if (this.path === "/") {
			/* convert body to buffer if stream */
	  		if (this.body && this.body._readableState)
	    		this.body = yield rawBody(this.body);

			/* generate the markup for this url */
			let {markup, state} = yield generateMarkupAndState(this.path, this.query);

			/* inject it into index.html */
			let $ = cheerio.load(this.body.toString());
			$('div#main').append(markup);
			$('head').append(`<script>window.__ISOMORPHIC_STATE__ = ${JSON.stringify(state)}</script>`);

			this.body = $.html();
		}
	};
}
