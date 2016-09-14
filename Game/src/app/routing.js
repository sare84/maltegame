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
            'all.resources', {
                url: "/resources",
                templateUrl: "resources/resources.html",
                controller: "resourceController",
            })
            .state(
            'all.gather', {
                url: "/gather",
                templateUrl: "gatherResources/gatherResources.html",
                controller: "gatherResourcesController"
            })
            .state(
            'all.stats', {
                url: "/stats",
                templateUrl: "stats/stats.html",
                controller: "statsController"
            })

        ;


    });
}();
