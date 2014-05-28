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
      $scope.checkSkill = true;
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
    $scope.rateSkill = true;
    $scope.checkSkill = false;
    $scope.rating = chooseRating($scope.guessedTemperature, $scope.currentTemperature);
  }

  reset = $scope.reset = function () {
    $scope.currentTemperature = null;
    $scope.rateSkill = false;
    $scope.checkSkill = false;
    $scope.rating = null;
    $scope.showGuess = false;
    $scope.guessedTemperature = null;
    $scope.forecast = null;
    Weather.getForecast(BUXTEHUDE.latitude, BUXTEHUDE.longitude).then(gotForecast, gotForecastFailed);
  }
  
  function chooseRating(guessed, apparent) {
    console.debug(guessed, apparent)
    index = Math.abs(guessed - apparent);
    rating = [
      "Sehr gut.",
      "Nah dran dude!",
      "Geht so.",
      "Nein, nein, so geht das wirklich nicht..."
    ]
    if (index > rating.length - 1) {
      index = rating.length - 1;
    }
    console.debug(index)
    return rating[index];
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
