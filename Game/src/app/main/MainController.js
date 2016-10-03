!function ($, jQuery) {
    "use strict";

    /**
     * @constructoru
     * @public
     *
     * @param $scope
     */
    function mainController($scope) {
        $scope.resources = null;
        console.log("mainCtrlScope");
        var init = function(){

        }

        init();
    }
    app.module.controller('mainController', mainController);
}();
