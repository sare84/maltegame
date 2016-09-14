!function ($, jQuery) {
    "use strict";

    app.module.directive('resourceClicks', function () {
        var controller = ['$scope', function($scope){

            function init(){
                $scope.allClicks = $scope.clickdata[window.clickEvents.clicks.all];
                $scope.woodClicks = $scope.clickdata[window.clickEvents.clicks.wood];
                $scope.foodClicks = $scope.clickdata[window.clickEvents.clicks.food];
            }

            init();
            }]
        return {
            restrict: 'E',
            templateUrl: 'stats/directives/resourceClicks/resourceClicks.html',
            scope: {
                clickdata: "="
            },
            controller: controller
        }
    });

}();
