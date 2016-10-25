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
                this.stats.highscore = 0;
                this.stats.levelsPlayed = 0; 
                this.stats.escapedMoles = 0;                 
            } 
        }

        // save clicks 
        this.saveStats = function(){
            localStorageService.saveMaulwurfnGameStats(this.stats); 
        }

        this.addGamesPlayed = function(){
            this.setStats(); 
            this.stats.gamesPlayed++; 
            this.saveStats(); 
        }

        this.addGamesWon = function() {
            this.setStats(); 
            this.stats.gamesWon++; 
            this.saveStats(); 
        }

        this.addGamesLost = function() {
            this.setStats(); 
            this.stats.gamesLost++; 
            this.saveStats(); 
        }

        this.addAllPoints = function(points) {
            this.setStats(); 
            this.stats.allPoints += points; 
            this.saveStats(); 
        }

        this.setHighScore = function(points) {
            this.setStats(); 
            if (this.stats.highscore < points) {
                this.stats.highscore = points; 
            }
            this.saveStats(); 
        }
        
        this.addEscapedMoles = function(number) {
            this.setStats(); 
            this.stats.escapedMoles+=number; 
            this.saveStats(); 
        }


    }
    app.module.service('maulwurfnGameService', maulwurfnGameService);
}();
