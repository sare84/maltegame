!function ($, jQuery) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     */
    function settingsController($scope, clickService, maulwurfnGameService, $window ) {

        var init = function(){
        }
 
        init();

        $scope.deleteGameData = function () {
            var deleteData = $window.confirm('Willst du wirklich alle Spieldaten löschen?');
            if(deleteData){
                clickService.resetData(); 
                maulwurfnGameService.resetData(); 
            }
        };
    }
    app.module.controller('settingsController', settingsController);
}();
