/// <reference path="../../_references.d.ts" />

import React from 'react';
import {Bid} from '../board/bid.jsx!';

export class BiddingBox extends React.Component {

    constructor(props) {
      super(props);
      console.log('creating bidding-box')
    }

    bidButton(bid, colspan) {
      return (
        <td key={Bid.key(bid)} className="bidding-box-cell" colSpan={colspan}>
          <button className="bidding-box-button md-raised"
                  onClick={() => this.makeBid(bid)}>
            <Bid bid={bid}></Bid>
          </button>
        </td>
      );
    }

    makeBid(bid) {
      console.log('in makeBid');
      var newstate = this.props.game.makeBid(bid);
      this.props.onGameStateChanged(newstate);
    }

    render() {
      var levels = [];
      for (let i = 1; i <= 7; i++) {
          let cells = [];
          for (var s = tower.BidSuit.Clubs; s <= tower.BidSuit.NoTrumps; s ++) {
              cells.push(this.bidButton({type: tower.BidType.Call, suit: s, level: i}, 2));
          }

          levels.push(
            <tr key={i} className="bidding-box-level">
              {cells}
            </tr>
          );
      }
      var modButtons = [
        this.bidButton({type: tower.BidType.Double}, 3),
        this.bidButton({type: tower.BidType.Redouble}, 3),
        this.bidButton({type: tower.BidType.NoBid}, 4)
      ];

      levels.push(
        <tr key="bottom" className="bidding-box-level">
            {modButtons}
        </tr>
      );

      return (
        <div className="bidding-box-container">
            <table>
                <colgroup>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                    <col span="1" style={{width: '10%'}}></col>
                </colgroup>
                <tbody>
                    {levels}
                </tbody>
            </table>
        </div>
      );
    }
}
