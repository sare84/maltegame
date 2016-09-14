!function ($, jQuery) {
    "use strict";

    app.module.directive('resourceOverview', function () {

        var controller = ['$scope', function($scope){
            function init(){
                $scope.resources = $scope.datasource;
            }

            init();
        }],
        templateUrl = 'directives/resourceOverview/resourceOverview.html';

        return {
            restrict: 'E',
            scope: {
              datasource: '='
            },
            controller: controller,
            templateUrl: templateUrl
        }
    });
}();
