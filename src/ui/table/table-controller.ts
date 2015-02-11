/// <reference path="../../_references.d.ts" />

class TableController {

    public static $inject = ["$state", "$stateParams", "$rootScope"];

    constructor(private $state: any,
                private $stateParams: any,
                private $rootScope: any) {

        this.game = $stateParams.game;

        $stateParams.players.forEach((player) => {
                player.game = this.game;
            })

        //$stateParams.game.setPlayers($stateParams.players);

        this.game.play($stateParams.players)
        	.then(
        		(game) => {
					$state.go(".result");
        		},
        		(err) => {
                    console.log(err);
        			$state.go(".error");
        		},
        		(game) => {

        		});

    }

    public game: tower.IGame;
}

export = TableController;
