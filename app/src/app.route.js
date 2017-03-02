'use strict';

nasaDashboard.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'src/partials/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'src/partials/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'dashboardCtrl'
        })
        .state('nasa', {
            parent : '/nasa',
            templateUrl: 'src/partials/nasa/nasa.html'
        })
        .state('facilities', {
            url: '/nasa/facilities',
            templateUrl: 'src/partials/nasa/nasa.facilities.html',
            controller: 'FacilitiesController',
            controllerAs: 'facilitiesCtrl'
        })
        .state('error', {
            url: '/error',
            templateUrl: 'src/partials/error.html',
            controller: 'ErrorController',
            controllerAs: 'errorCtrl'
        });

    $urlRouterProvider.otherwise('/login');
});