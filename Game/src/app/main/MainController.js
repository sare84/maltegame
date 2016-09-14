!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function mainController($scope, resourceService) {
        $scope.resources = null;
        console.log("mainCtrlScope");
        var init = function(){
            console.log("Test");
            $scope.resources = resourceService.getResources();
        }

        init();
    }
    app.module.controller('mainController', mainController);
}();
