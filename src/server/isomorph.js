import path from "path";
import generateMarkupAndState from "../ui/server";
import cheerio from "cheerio";
import parser from "co-body";

export function isomorph() {
	return function *(next) {
		if (this.method !== 'GET') return yield next;
		let origPath = this.path;
		yield next;

		if (this.path === "/index.html") {
			var bodyJson = yield parser.json(this);

	    	console.log('server rendering ' + origPath);

			/* generate the markup for this url */
			let {markup, state} = yield generateMarkupAndState(origPath, this.query);

			/* inject it into index.html */
			let $ = cheerio.load(this.body.toString());
			$('div#main').append(markup);
			$('head').append(`<script>window.__ISOMORPHIC_STATE__ = ${JSON.stringify(state)}</script>`);

			this.body = $.html();
		}
	};
}

export function serveIndex(mount) {
	return function *(next) {
		if (this.method !== 'GET') return yield next;
		if ((this.path.indexOf(mount) === 0) || (this.path === "/") || (this.path === "")) {
			this.path = "/index.html";
		}
		yield next;
	};
}
