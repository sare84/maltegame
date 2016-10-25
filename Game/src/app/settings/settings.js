!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function settingsController($scope, clickService, maulwurfnGameService ) {

        var init = function(){

        }
 
        init();

        $scope.deleteGameData = function(){
            clickService.resetData(); 
            maulwurfnGameService.resetData(); 
        }
    }

    app.module.controller('settingsController', settingsController);
}();
