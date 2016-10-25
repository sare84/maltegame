!function ($, jQuery) {
    "use strict";

    app.module.directive('allClicks', function () {
        var controller = ['$scope',  function($scope){

            function init(){
                
            }

            init();
            }]
        return {
            restrict: 'E',
            templateUrl: 'stats/directives/allClicks/allClicks.html',
            scope: {
                clickdata: "="
            },
            controller: controller 
        }
    });

}();
