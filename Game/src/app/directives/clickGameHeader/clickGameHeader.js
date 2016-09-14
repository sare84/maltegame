!function ($, jQuery) {
    "use strict";

    app.module.directive('clickGameHeader', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/clickGameHeader/clickGameHeader.html',
            scope: {
                title: '@'
            },

            link: function (scope, element, attrs) {

            }
        }
    });
}();
