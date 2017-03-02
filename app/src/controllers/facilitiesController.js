'use strict';

nasaDashboard.controller('FacilitiesController', ['$log', '$scope', '$sce', 'ndbConfig', 'UsaCountryService', 'FacilitesService',
    function ($log, $scope, $sce, ndbConfig, UsaCountryService, FacilitesService) {
        var self = this;

        self.fields = {
            title: ndbConfig.get().FACILITIES.TITLE,
            subtitle: ndbConfig.get().FACILITIES.SUBTITLE,
            facilitiesList : []
        };

        var _fetchFacilities = function () {
            FacilitesService.fn.getAll().then(function (response) {
                angular.forEach(response.data, function (facility) {
                    var statusClass = '';
                    if(facility.status === 'Inactive') {
                        statusClass = 'danger';
                    } else if(facility.status === '' || facility.status == undefined || facility.status == null) {
                        statusClass = 'warning';
                    }
                    var hasLinkUrl = facility.url_link !== '' && facility.url_link != undefined && facility.url_link != null;

                    self.fields.facilitiesList.push({
                        statusClass : statusClass,
                        status : facility.status,
                        name : $sce.trustAsHtml((hasLinkUrl)?'<a href="'+facility.url_link+'" target="_blank">'+facility.center+'</a>':facility.center),
                        state : UsaCountryService.fn.get(facility.state),
                        desc : facility.facility

                    });
                });
            },function errorCallback(response) {
                $log.error('Failed to load facilities : ' + response.status + ' -> ' + response.data);
            });
        };

        _fetchFacilities();

        self.fn = {
            fetchFacilities: _fetchFacilities
        };
    }
]);
