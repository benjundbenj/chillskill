angular.module('weatherGuess.controllers', [])

.controller('WeatherController', function ($scope, WeatherFactory,$ionicPlatform) {
  $scope.slideFinished = false;

  Weather = new WeatherFactory();

  function slideFinished(event) {
    $scope.$apply(function () {
      $scope.slideFinished = true;
      $scope.checkSkill = true;
    });
  }

  function slideStarted(event) {
    $scope.$apply(function () {
      $scope.slideFinished = false;
    });
  }

  $scope.$on("temperature-slider.dragend", slideFinished);
  $scope.$on("temperature-slider.dragstart", slideStarted);

  $scope.showResults = function (guessedTemperature) {
    $scope.currentTemperature = $scope.forecast.apparentTemperature;
    $scope.rateSkill = true;
    $scope.checkSkill = false;
    $scope.rating = chooseRating(guessedTemperature, $scope.currentTemperature);
  }

  reset = $scope.reset = function () {
    $scope.currentTemperature = null;
    $scope.rateSkill = false;
    $scope.checkSkill = false;
    $scope.rating = null;
    $scope.slideFinished = false;
    $scope.guessedTemperature = null;
    $scope.forecast = null;
    Weather.getForecastForMyPosition().then(gotForecast, gotForecastFailed);
  }
  
  function chooseRating(guessed, apparent) {
    index = Math.abs(Math.ceil(guessed - apparent));
    rating = [
      "Sehr gut.",
      "Nah dran dude!",
      "Geht so.",
      "Nein, nein, so geht das wirklich nicht..."
    ]
    if (index > rating.length - 1) {
      index = rating.length - 1;
    }
    return rating[index];
  }

  function gotForecast(forecast) {
    $scope.forecast = forecast;
    $scope.guessedTemperature = angular.copy(forecast.temperature);
  }

  $ionicPlatform.ready(function() {
    Weather.getForecastForMyPosition().then(gotForecast);
  });

});
