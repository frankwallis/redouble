import {Component, Template, Switch, SwitchWhen} from 'angular2/angular2';
import {Suit,Pip,Card,suitName,pipName} from "../../model/core/card";

@Component({
   selector: 'card-component',
   services: [],
   bind: {
      card: "card"
   }
})
@Template({
   url: 'src/ui/components/card.html',
   directives: []
})
export class CardComponent {

    constructor() {
      this.Suit = Suit;
      this.Card = Card;
      this.Pip = Pip;
      this.suitName = suitName;
      this.pipName = pipName;
    }
}
