!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function localStorageService() {
        var clickDataString = 'clickData'; 
        var maulwurfnGameStatsString = 'maulwurfnGameStats'; 

        var init = function() {
        }

        init();

        // load saved clicks 
        this.loadSavedClicks = function(){
            var clickDataJson = localStorage.getItem(clickDataString); 
            return JSON.parse(clickDataJson); 
        }

        // save clicks 
        this.saveClickStats = function(clicks){      
            localStorage.setItem(clickDataString, JSON.stringify(clicks) );
        }

        // load maulwurfn game stats 
        this.loadMaulwurfnGameStats = function(){
            var stats = localStorage.getItem(maulwurfnGameStatsString); 
            return JSON.parse(stats); 
        }

        // save maulwurfn game stats  
        this.saveMaulwurfnGameStats = function(gameStats){      
            localStorage.setItem(maulwurfnGameStatsString, JSON.stringify(gameStats) );
        }
    }

    app.module.service('localStorageService', localStorageService);
}();
