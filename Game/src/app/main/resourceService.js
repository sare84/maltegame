!function ($, jQuery) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     */
    function resourceService() {
        var resourceObject = null;

        var init = function()
        {
            resourceObject = new Object();
            resourceObject.food =  0;
            resourceObject.wood = 0;
        }

        init();

        this.getResources = function(){
            return resourceObject;
        }

        this.getFoodIncrease = function(){
            var increase = 1;
            return increase;
        }

        this.getWoodIncrease = function(){
            var increase = 1;
            return increase;
        }

    }

    app.module.service('resourceService', resourceService);
}();
