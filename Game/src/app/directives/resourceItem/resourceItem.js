!function ($, jQuery) {
    "use strict";

    app.module.directive('resourceItem', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/resourceItem/resourceItem.html',
            scope: {
                itemtext: '@',
                value: '=',
                icon: '='
            },
            link: function (scope, element, attrs) {
            }
        }
    });
}();
