!function ($, jQuery) {
    "use strict";

    app.module.directive('clickSection', function () {
        return {
            restrict: 'E',
            templateUrl: 'stats/directives/clickSection/clickSection.html',
            scope: {
                itemtext: '@',
                value: '=',
                icon: '@'
            },
            link: function (scope, element, attrs) {
            }
        }
    });
}();
