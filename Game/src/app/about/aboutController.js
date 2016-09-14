!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function aboutController($scope, resourceService) {
        $scope.resources = null;
        console.log("aboutControllerScope");
        var init = function(){
            console.log("aboutControllerScope");
            $scope.resources = resourceService.getResources();
        }

        init();
    }
    app.module.controller('aboutController', aboutController);
}();
