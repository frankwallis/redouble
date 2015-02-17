/// <reference path="../_references.d.ts" />

import {Router} from 'aurelia-router';

export class App {
	constructor(router: Router) {
		this.router = router;
		router.configure(config => {
			config.title = 'Tower';
			config.map([
				{ route: ['', 'home'], moduleId: './menu/menu', nav: true, title: 'Home' },
				{ route: 'game', moduleId: './table/table', nav: true }
			]);
		});
	}
}
