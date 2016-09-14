!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function gatherResourcesController($scope, resourceService, clickcountService) {
        $scope.resources = null;

        var init = function(){
            $scope.resources = resourceService.getResources();
        }

        $scope.gatherFood = function(){
            var foodIncrease = resourceService.getFoodIncrease();
            $scope.resources.food += foodIncrease;
            clickcountService.countClick(window.clickEvents.clicks.food);
            var test = clickcountService.getClickCountObject();
        }

        $scope.gatherWood = function(){
            var woodIncrease = resourceService.getWoodIncrease();
            $scope.resources.wood += woodIncrease;
            clickcountService.countClick(window.clickEvents.clicks.wood);
        }


        init();

    }

    app.module.controller('gatherResourcesController', gatherResourcesController);
}();
