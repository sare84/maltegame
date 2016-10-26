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

        this.newDataObject = function(){
            this.stats = new Object();
            this.stats.gamesPlayed = 0; 
            this.stats.gamesWon =  0;
            this.stats.gamesLost = 0;
            this.stats.allPoints = 0;
            this.stats.highscore = 0;
            this.stats.maxLevel = 1; 
            this.stats.escapedMoles = 0;     
        }

        // load clicks 
        this.getStats = function(){
            this.setStats(); 
            return this.stats; 
        }

        // set clicks 
        this.setStats = function(){
            this.stats = localStorageService.loadMaulwurfnGameStats(); 
            if (!this.stats) {
                 this.newDataObject(); 
            } 
        }

        // save clicks 
        this.saveStats = function(){
            localStorageService.saveMaulwurfnGameStats(this.stats); 
        }

        // resets data 
        this.resetData = function(){
            this.newDataObject(); 
            this.saveStats(); 
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

        this.setMaxLevel = function(level) {
            this.setStats(); 
            if (this.stats.maxLevel < level) {
                this.stats.maxLevel = level; 
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
