'use strict';

nasaDashboard.config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');
}]);
