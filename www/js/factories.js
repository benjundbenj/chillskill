angular.module('weatherGuess.factories', [])

.factory("WeatherFactory", function ($q,$timeout) {
  // https://api.forecast.io/forecast/72378dafb149e2a5fe80c91f3a3b6eef/53.4772,9.7031?units=si&exclude=minutely,hourly,daily,flags

  var forecastApiKey = '72378dafb149e2a5fe80c91f3a3b6eef';

  var response = {
    latitude: 53.4772,
    longitude: 9.7031,
    timezone: "Europe/Berlin",
    offset: 2,
    currently: {
      time: 1401078166,
      summary: "Clear",
      icon: "clear-day",
      precipIntensity: 0,
      precipProbability: 0,
      temperature: 13.17,
      apparentTemperature: 13.17,
      dewPoint: 11.14,
      humidity: 0.88,
      windSpeed: 3.32,
      windBearing: 59,
      visibility: 9.99,
      cloudCover: 0.16,
      pressure: 1019.62,
      ozone: 333.35
    }
  }

  return function () {
    exports = {}

    exports.getForecast = function (latitude, longitude) {
      getForecastDeferred = $q.defer();
      $timeout(function () {
        getForecastDeferred.resolve(response.currently);
      }, 500)
      return getForecastDeferred.promise;
    }

    return exports;
  }

})