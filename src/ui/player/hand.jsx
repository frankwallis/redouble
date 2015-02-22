/// <reference path="../../_references.d.ts" />
import React from 'react';

export class Hand extends React.Component {

    constructor(props) {
      super(props);
      console.log('props: ' + JSON.stringify(props));
      this.state = { hand: props.hand };
    }

    render() {
      return this.state.hand.availableCards.map((card) =>
        <div>{card.pip}</div>
      );
    }
}
