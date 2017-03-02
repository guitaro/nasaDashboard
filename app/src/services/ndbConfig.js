nasaDashboard.provider('ndbConfig', [function ndbConfigProvider() {
    var configFile = 'config/config.json';
    var isLoaded = false;
    var baseConfig = undefined;

    this.configFile = function (value) {
        configFile = value;
    };

    this.get = function () {
        return baseConfig;
    };

    this.$get = ['$http', '$log', function ndbConfigFactory($http, $log) {
        return {
            get: function () {

                if (!isLoaded) {
                    if (baseConfig == undefined) {
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function () {
                            if (xhttp.readyState == 4 && xhttp.status == 200) {
                                baseConfig = JSON.parse(xhttp.responseText);
                                isLoaded = true;
                                $log.info('Configuration loaded successfully');
                            }
                        };
                        xhttp.onerror = function () {
                            $log.info('Configuration loading failed : ' + response.status + ' -> ' + response.data);
                        };

                        xhttp.open("GET", configFile, false);
                        xhttp.send();
                    }
                }

                return baseConfig;
            }
        };
    }];
}]);

