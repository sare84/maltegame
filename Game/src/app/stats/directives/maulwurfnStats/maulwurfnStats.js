!function ($, jQuery) {
    "use strict";

    app.module.directive('maulwurfnStats', function () {
        var controller = ['$scope',  function($scope){

            function init(){
                
            }

            init();
            }]
        return {
            restrict: 'E',
            templateUrl: 'stats/directives/maulwurfnStats/maulwurfnStats.html',
            scope: {
                stats: "="
            },
            controller: controller 
        }
    });

}();
