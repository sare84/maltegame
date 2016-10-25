!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function localStorageService() {
        var clickDataString = 'clickData'; 

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
    }

    app.module.service('localStorageService', localStorageService);
}();
