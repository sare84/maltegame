(function() {
}());
!function ($, jQuery) {
    "use strict";

    window.app = {};

    window.clickEvents = {
        all : "click:all",
        clicks : {
            all : "click:resources:all",
            food: "click:resources:food",
            wood: "click:resources:wood"
        }

    };

    app.module = angular.module('clickgame', ['ui.router', 'templates']) ;

}();
