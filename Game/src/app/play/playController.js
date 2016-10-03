!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function playController($scope) {
        $scope.resources = null;
        console.log("playControllerScope");
        var init = function(){

        }

        init();
    }
    app.module.controller('playController', playController);
}();
