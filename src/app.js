import {Router} from 'aurelia-router';

export class App {
  constructor(router: Router) {

    router.configure(config => {
      config.title = 'Tower';
      config.map([
        { route: ['','home'], moduleId: 'welcome', nav: true, title:'Home' },
        { route: 'game', moduleId: 'game', nav: true }
      ]);
    });

  }
}
