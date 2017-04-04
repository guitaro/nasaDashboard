'use strict';

nasaDashboard.controller('FacilitiesController', ['$log', '$scope', '$sce', 'ndbConfig', 'UsaCountryService', 'FacilitesService', 'NgTableParams',
    function ($log, $scope, $sce, ndbConfig, UsaCountryService, FacilitesService, NgTableParams) {
        var self = this;

        self.fields = {
            title: ndbConfig.get().FACILITIES.TITLE,
            subtitle: ndbConfig.get().FACILITIES.SUBTITLE,
            facilitiesList: [],
            map: {
                title: 'Map',
                center: new google.maps.LatLng(0, 0),
                map: new google.maps.Map(document.getElementById('map-canvas'), {
                        zoom: 8,
                        center: new google.maps.LatLng(0, 0)
                    }),
                markers: [],
                markersNames: []
            },
            tableParams : null
        };

        var _fetchFacilities = function () {
            FacilitesService.fn.getAll().then(function (response) {
                angular.forEach(response.data, function (facility) {
                    var statusClass = '';
                    if (facility.status === 'Inactive') {
                        statusClass = 'danger';
                    } else if (facility.status === '' || facility.status == undefined || facility.status == null) {
                        facility.status = 'Unknown';
                        statusClass = 'warning';
                    }
                    var hasLinkUrl = facility.url_link !== '' && facility.url_link != undefined && facility.url_link != null;

                    self.fields.facilitiesList.push({
                        statusClass: statusClass,
                        status: facility.status,
                        link: $sce.trustAsHtml((hasLinkUrl) ? '<a href="' + facility.url_link + '" target="_blank">' + facility.center + '</a>' : facility.center),
                        name: facility.center,
                        state: UsaCountryService.fn.get(facility.state),
                        desc: facility.facility,
                        position: {
                            lat: facility.location.coordinates[1],
                            lon: facility.location.coordinates[0]
                        }
                    });
                });

                // Configuration de l'affichage du tableau
                self.fields.tableParams = new NgTableParams({
                    count:10,
                    sorting: { name: "asc" },
                    group: {
                        state: "asc"
                    }
                }, {
                    dataset: self.fields.facilitiesList,
                    groupOptions: {
                        isExpanded: false
                    }
                });
            }, function errorCallback(response) {
                $log.error('Failed to load facilities : ' + response.status + ' -> ' + response.data);
            });
        };

        var _showMap = function (facility) {

            self.fields.map.title = facility.name + ' (' + facility.state + ')';
            self.fields.map.center = new google.maps.LatLng(facility.position.lat, facility.position.lon);
            self.fields.map.map.setZoom(7);

            _initMarkers();

            $('#modal-map').modal({
                backdrop: 'static',
                keyboard: false
            }).on('shown.bs.modal', function () {
                google.maps.event.trigger(self.fields.map.map, 'resize');
                self.fields.map.map.setCenter(self.fields.map.center);
            });
        };

        var _initMarkers = function () {
            angular.forEach(self.fields.facilitiesList, function (facility) {
                if (self.fields.map.markersNames.indexOf(facility.name) === -1) {
                    self.fields.map.markers.push(new google.maps.Marker({
                        map: self.fields.map.map,
                        position: new google.maps.LatLng(facility.position.lat, facility.position.lon),
                        title: facility.name
                    }));
                    self.fields.map.markersNames.push(facility.name);
                }
            });
        };

        _fetchFacilities();

        self.fn = {
            fetchFacilities: _fetchFacilities,
            showMap: _showMap
        };
    }
]);
