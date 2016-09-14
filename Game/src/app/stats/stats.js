!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function statsController($scope, clickcountService) {

        var init = function(){
            $scope.clickdata = clickcountService.getClickCountObject();
        }

        init();
    }

    app.module.controller('statsController', statsController);
}();
