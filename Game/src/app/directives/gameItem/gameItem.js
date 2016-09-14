!function ($, jQuery) {
    "use strict";

    app.module.directive('gameItem', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/gameItem/gameItem.html',
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
