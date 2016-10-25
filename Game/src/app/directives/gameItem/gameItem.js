!function ($, jQuery) {
    "use strict";

    app.module.directive('gameItem', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/gameItem/gameItem.html',
            scope: {
                itemtext: '@',
                gamelink: '@',
                icon: '@'
            },
            link: function (scope, element, attrs) {
            }
        }
    });
}();
