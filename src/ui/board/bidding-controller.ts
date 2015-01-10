/// <reference path="../../_references.d.ts" />

class BiddingController {

    public static $inject = ["$scope"]; 

    constructor(private $scope: any) {
        $scope.$watchCollection(() => $scope.bidding.bids,
                      () => {
                          this.rounds = this.getRounds($scope.bidding);
                      });
    }
    
    public rounds: Array<Array<tower.IBid>>;
    
    private getRounds(bidding: tower.IBidding) {
        var result = [];
        
        for (var i = 0; i < 6; i ++) {
            result.push([,,,]);
        }
                
        bidding.bids.forEach(function(bid, idx) {
            result[Math.floor(idx/4)][idx % 4] = bid;
        });
        
        return result;
    }

}

export = BiddingController;