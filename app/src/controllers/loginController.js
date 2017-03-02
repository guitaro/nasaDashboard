'use strict';

nasaDashboard.controller('LoginController', ['$log', 'ndbConfig',
    function ($log, ndbConfig) {
        var self = this;

        self.fields = {
            title: ndbConfig.get().LOGIN.TITLE
        };
    }
]);
