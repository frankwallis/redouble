/// <reference path="../../_references.d.ts" />

class MenuController {

    public static $inject = ["$state", "$rootScope", "towerService" ]; 

    constructor(private $state: any,
                private $rootScope: any,
                private towerService: tower.ITowerService) {
        
         
    }
    
    public startGame() {
        var game = this.towerService.createGame();
        var players = this.createPlayers();
        
        this.$state.go('table', { "game": game, "players": players });
    }
    
    private createPlayers(): Array<tower.IPlayer> {
    	var result = [];
    	result.push(this.towerService.createComputer("north"));
    	result.push(this.towerService.createComputer("east"));
    	result.push(this.towerService.createComputer("south"));
    	result.push(this.towerService.createComputer("west"));
    	return result;
    }

}

export = MenuController;