/// <reference path="../../_references.d.ts" />

import React from 'react';
import {Bid} from './bid.jsx!';

export class Bidding extends React.Component {

    constructor(props) {
      super(props);
      console.log("creating bidding");
    }

    render() {
      var headings = [];

      for (var idx = 0; idx < 4; idx ++) {
        headings.push(
          <th class="bidding-cell">North</th>
        );
      }

      var rows = [];

      for (var i = 0; i < 6; i ++) {
        var cells = [];

        for (var j = 0; j < 4; j ++) {
          var position = (i*4) + j;

          if (this.props.board.bids.length > position) {
            var bid = this.props.board.bids[position];
            cells.push(
              <td key={position} className="bidding-cell">
                  <Bid bid={bid}></Bid>
              </td>
            );
          }
          else {
            cells.push(<td key={position} className="bidding-cell"></td>);
          }
        }
        rows.push(
          <tr key={i} className="bidding-round">
            {cells}
          </tr>
        );
      }

      return (
        <table className="bidding-container">
          <thead>
            <tr>{headings}</tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      );
    }
}
