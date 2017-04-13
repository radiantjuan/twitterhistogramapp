(function(){
    "use strict";

    var app = angular.module('twitterapp', [
        'ngRoute',
        'chart.js'
    ]);

    app.config(config);

    config.$inject = [
        '$routeProvider',
        '$locationProvider',
    ];

    function config(
        $routeProvider,
        $locationProvider
    ){

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'templates/default.html',
                controller: 'DefaultController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
    console.log('ApspInitialized!');

})();