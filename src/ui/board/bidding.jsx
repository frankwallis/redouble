/// <reference path="../../_references.d.ts" />

import React from 'react';
import Bid from './bid';

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
          bid = {type: tower.BidType.NoBid}; // TODO
          cells.push(
            <td className="bidding-cell">
                <Bid bid={bid}></tower-bid>
            </td>
          );
        }
        rows.push(
          <tr className="bidding-round">
            {cells}
          </tr>
        );
      }

      return (
        <table className="bidding-container">
          <thead>
            <tr>
              {headings}
            </tr>
          <thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      );
    }
}
