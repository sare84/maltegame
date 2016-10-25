!function ($, jQuery) {
    "use strict";

    app.module.config(function ($stateProvider, $urlRouterProvider) {

        // fallback
        $urlRouterProvider.otherwise('/all/main');

        $stateProvider
            .state(
            'all', {
                abstract: true,
                url: "/all",
                template: "<ui-view />"
            })
            .state(
            'all.main', {
                url: "/main",
                templateUrl: "main/main.html",
                controller: "mainController",
            })
            .state(
            'all.about', {
                url: "/about",
                templateUrl: "about/about.html",
                controller: "aboutController",
            })
            .state(
            'all.play', {
                url: "/play",
                templateUrl: "play/play.html",
                controller: "playController"
            })
            .state(
            'all.stats', {
                url: "/stats",
                templateUrl: "stats/stats.html",
                controller: "statsController"
            })
            .state(
            'all.settings', {
                url: "/settings",
                templateUrl: "settings/settings.html",
                controller: "settingsController"
            })


            .state(
            'all.maulwurfn', {
                url: "/game/maulwurfn",
                templateUrl: "games/maulwurfn/maulwurfn.html",
                controller: "maulwurfnController"
            })

        ;


    });
}();
