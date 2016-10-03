!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function clickService() {
        var clickObject = null;

        var init = function()
        {
            clickObject = new Object();
            clickObject.all = 0; 
            clickObject.malte =  0;
            clickObject.mole = 0;
            clickObject.lawn = 0;
        }

        init();

        this.getClicks = function(){
            return clickObject;
        }

        this.malteClicked = function(){
            clickObject.malte++; 
            clickObject.all++; 
        }

        this.moleClicked = function(){
            clickObject.mole++; 
            clickObject.all++; 
        }

        this.lawnClicked = function(){
            clickObject.lawn++; 
            clickObject.all++;             
        }

    }

    app.module.service('clickService', clickService);
}();
