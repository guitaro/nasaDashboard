'use strict';

nasaDashboard.controller('ErrorController', ['$log', 'ndbConfig',
    function ($log, ndbConfig) {
        var self = this;

        self.fields = {
            title: ndbConfig.get().ERROR.TITLE
        };
    }
]);
