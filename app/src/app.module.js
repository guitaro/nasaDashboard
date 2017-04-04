'use strict';

var nasaDashboard = angular.module('ndb-app', [
    'ui.router',
    'ngTable'
])
.config(['ndbConfigProvider', function (ndbConfigProvider) {
    ndbConfigProvider.configFile("/conf/config.json");
}]).run();