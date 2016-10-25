!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function clickService(localStorageService) {
        var clickObject = null;

        var init = function(){
        }

        init();

        // load clicks 
        this.getClicks = function(){
            this.setClicks(); 
            return this.clickObject; 
        }

        // set clicks 
        this.setClicks = function(){
            this.clickObject = localStorageService.loadSavedClicks(); 
            if (!this.clickObject) {
                this.clickObject = new Object();
                this.clickObject.all = 0; 
                this.clickObject.malte =  0;
                this.clickObject.mole = 0;
                this.clickObject.lawn = 0;
            } 
        }

        // save clicks 
        this.saveClicks = function(){
            localStorageService.saveClickStats(this.clickObject); 
        }

        // specific click action for malte clicked 
        this.malteClicked = function(){
            this.setClicks(); 
            this.clickObject.malte++; 
            this.clickObject.all++; 
            this.saveClicks(); 
        }

        // specific click action for mole clicked     
        this.moleClicked = function(){
            this.setClicks(); 
            this.clickObject.mole++; 
            this.clickObject.all++; 
            this.saveClicks(); 
        }

        // specific click action for lawn clicked 
        this.lawnClicked = function(){
            this.setClicks(); 
            this.clickObject.lawn++; 
            this.clickObject.all++;          
            this.saveClicks();    
        }
    }
    app.module.service('clickService', clickService);
}();
