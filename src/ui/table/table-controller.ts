/// <reference path="../../_references.d.ts" />

class TableController {

    public static $inject = ["$state", "$stateParams", "$rootScope"]; 

    constructor(private $state: any,
                private $stateParams: any,
                private $rootScope: any) {
        
        this.game = $stateParams.game;
        
        console.log(JSON.stringify($stateParams));
        // TODO - let them cut to deal
                
        this.game.setPlayers($stateParams.players);
    
        this.game.play($stateParams.players[0])
        	.then(
        		(game) => {
					$state.go(".result");
        		},
        		(err) => {
        			$state.go(".error");
        		},
        		(game) => {
        			
        		});
         
    }
    
    public game: tower.IGame;
}

export = TableController;