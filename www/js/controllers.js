angular.module('weatherGuess.controllers', [])

.controller('WeatherController', function ($scope, WeatherFactory) {

  Weather = new WeatherFactory();

  var BUXTEHUDE = {
    latitude: 53.4772,
    longitude: 9.7031
  }

  function gotForecast(forecast) {
    $scope.currentTemperature = forecast.temperature;
    $scope.guessedTemperature = forecast.temperature;
  }

  function gotForecastFailed(error) {
    console.error(error);
  }

  Weather.getForecast(BUXTEHUDE.latitude, BUXTEHUDE.longitude).then(gotForecast, gotForecastFailed);

});
