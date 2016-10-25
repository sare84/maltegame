!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function statsController($scope, clickService, maulwurfnGameService) {

        var init = function(){
            $scope.clickdata = clickService.getClicks();
            $scope.maulwurfnstats = maulwurfnGameService.getStats(); 
        }

        init();
    }

    app.module.controller('statsController', statsController);
}();
