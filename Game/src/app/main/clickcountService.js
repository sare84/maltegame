!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function clickcountService() {
        var clickCountObject = null;

        var init = function(){
            clickCountObject = new Object();
            clickCountObject[window.clickEvents.clicks.all] = 0;
            clickCountObject[window.clickEvents.clicks.food] = 0;
            clickCountObject[window.clickEvents.clicks.wood] = 0;
        }

        init();

        this.countClick = function(clickedItem){
            if (clickCountObject.hasOwnProperty(clickedItem))
            {
                clickCountObject[clickedItem]++;
            }
            clickCountObject[window.clickEvents.clicks.all]++;
        }


        this.getClickCountObject = function(){
            return clickCountObject;
        }
    }

    app.module.service('clickcountService', clickcountService);
}();
