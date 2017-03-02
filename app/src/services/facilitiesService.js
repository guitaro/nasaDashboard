'use strict';

nasaDashboard.factory('FacilitesService', ['$log', 'ndbConfig', '$http', function($log, ndbConfig, $http) {

    var self = this;

    self.fields = {
        title : ndbConfig.get().FACILITIES.TITLE
    };

    var _getAll = function () {
        return $http.get(ndbConfig.get().FACILITIES.SERVICE.URL);
    };

    self.fn = {
      getAll : _getAll
    };

    return self;
}]);