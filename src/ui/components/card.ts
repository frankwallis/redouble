/// <reference path="../../_references.d.ts" />

import {Component, View, Switch, SwitchWhen} from 'angular2/angular2';
import {Suit, Pip, Card, suitName, pipName, ICard} from "../../model/core/card";

import "./suit.css";
import "./card.css";
import cardTemplate from "./card.html";

@Component({
   selector: 'card-component',
   properties: [ "card" ]
})
@View({
   template: cardTemplate,
   directives: []
})
export class CardComponent {

   constructor() {
      this.suitName = suitName;
      this.pipName = pipName;
   }
    
   public suitName: (suit: number) => string;
   public pipName: (pip: number) => string;
   public card: ICard;    
}
