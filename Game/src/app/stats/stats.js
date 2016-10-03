!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function statsController($scope, clickService) {

        var init = function(){
            $scope.clickdata = clickService.getClicks();
        }

        init();
    }

    app.module.controller('statsController', statsController);
}();
