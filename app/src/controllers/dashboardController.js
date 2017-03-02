'use strict';

nasaDashboard.controller('DashboardController', ['$log', 'ndbConfig',
    function ($log, ndbConfig) {
        var self = this;

        self.fields = {
            title: ndbConfig.get().DASHBOARD.TITLE
        };
    }
]);
