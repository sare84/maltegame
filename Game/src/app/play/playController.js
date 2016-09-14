!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function playController($scope, resourceService) {
        $scope.resources = null;
        console.log("playControllerScope");
        var init = function(){
            console.log("playControllerScope");
            $scope.resources = resourceService.getResources();
        }

        init();
    }
    app.module.controller('playController', playController);
}();
