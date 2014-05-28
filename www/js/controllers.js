angular.module('weatherGuess.controllers', [])

.controller('WeatherController', function ($scope, WeatherFactory) {
  $scope.showGuess = false;

  Weather = new WeatherFactory();

  var BUXTEHUDE = {
    latitude: 53.4772,
    longitude: 9.7031
  }

  function guessFinished(event) {
    $scope.$apply(function () {
      $scope.showGuess = true;
    });
  }

  function hideGuess(event) {
    $scope.$apply(function () {
      $scope.showGuess = false;
    });
  }

  $scope.$on("temperature-slider.dragend", guessFinished);
  $scope.$on("temperature-slider.dragstart", hideGuess);

  $scope.showResults = function () {
    $scope.currentTemperature = $scope.forecast.apparentTemperature;
  }

  function gotForecast(forecast) {
    $scope.forecast = forecast;
    $scope.guessedTemperature = forecast.temperature;
  }

  function gotForecastFailed(error) {
    console.error(error);
  }

  Weather.getForecast(BUXTEHUDE.latitude, BUXTEHUDE.longitude).then(gotForecast, gotForecastFailed);

});
