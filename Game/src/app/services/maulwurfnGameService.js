!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc maulwurfnGameService
     * @public
     */
    function maulwurfnGameService(localStorageService) {
        var stats = null;

        var init = function(){
        }

        init();

        // load clicks 
        this.getStats = function(){
            this.setStats(); 
            return this.stats; 
        }

        // set clicks 
        this.setStats = function(){
            this.stats = localStorageService.loadMaulwurfnGameStats(); 
            if (!this.stats) {
                this.stats = new Object();
                this.stats.gamesPlayed = 0; 
                this.stats.gamesWon =  0;
                this.stats.gamesLost = 0;
                this.stats.allPoints = 0;
                this.stats.sessionPoints = 0;
                this.stats.levelsPlayed = 0; 
            } 
        }

        // save clicks 
        this.saveStats = function(){
            localStorageService.saveMaulwurfnGameStats(this.stats); 
        }

        // specific click action for malte clicked 
        this.addGamesPlayed = function(){
            this.setStats(); 
            this.stats.gamesPlayed++; 
            this.saveStats(); 
        }

    }
    app.module.service('maulwurfnGameService', maulwurfnGameService);
}();
