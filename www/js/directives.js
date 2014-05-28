angular.module('weatherGuess.directives', [])

.directive('weatherSlider', function ($ionicGesture) {
  return {
    replace: true,
    restrict: 'E',
    scope: {
      temperature: "=",
      range: '=',
      currentTemperature: '='
    },
    template: '<div class="temperature-slider">'
            + '<div class="current-temperature temperature-indicator animated {{animation}}" ng-show="currentTemperature" style="top: {{currentY}}px;">{{currentTemperature | round}}°</div>'
            + '<div class="temperature-label" style="top: 0%">{{startTemperature - range | round}}°</div>'
            + '<div class="temperature-label" style="top: 25%">{{startTemperature - range * 0.5 | round}}°</div>'
            + '<div class="temperature-label" style="top: 50%">{{startTemperature | round}}°</div>'
            + '<div class="temperature-label" style="top: 75%">{{startTemperature + range * 0.5 | round}}°</div>'
            + '<div class="temperature-label" style="top: 100%">{{startTemperature + range | round}}°</div>'
            + '<div class="temperature-button temperature-indicator" style="top: {{y}}px">{{temperature | round}}°</div>'
            + '</div>',
    link: function ($scope, $element, $attributes) {

      var guessedTemperatureWatch = $scope.$watch('temperature', function (value) {
        if (angular.isDefined(value)) {
          $scope.startTemperature = value;
          guessedTemperatureWatch();
        }
      }, true);

      $scope.$watch('currentTemperature', function (value) {
        if (angular.isDefined(value)) {
          $scope.currentTemperature = value;
          $scope.currentY = calculatePositionFromTemperature(value);
          $scope.animation = "bounceInDown";
        }
      }, true);

      function calculateTemperature(y) {
        var height = $($element).height(),
            pixelsPerDegree = height / ($scope.range * 2);
        degrees = y / pixelsPerDegree - $scope.range + $scope.startTemperature;

        return degrees;
      }

      function calculatePositionFromTemperature(degrees) {
        $container = $($element);
        var height = $container.height(),
            offset = $container.offset().top
            pixelsPerDegree = height / ($scope.range * 2);
        y = (Number(degrees) + $scope.range - $scope.startTemperature) * pixelsPerDegree;

        return y;
      }

      function capY(y, offset) {
        var maxY = $($element).height(),
            cappedY;
        if (y < 0) {
          cappedY = 0;
        } else if (y <= maxY) {
          cappedY = y;
        } else {
          cappedY = maxY;
        }
        return cappedY;
      }

      function drag(event) {
        var offset  = $($element).offset().top,
            y       = Math.floor(event.gesture.center.pageY) - offset,
            cappedY = capY(y, offset);

        $scope.$apply(function () {
          $scope.temperature = calculateTemperature(cappedY);
          $scope.y           = y;
        });
      }

      function dragend(event) {
        $scope.$emit("temperature-slider.dragend", event);
      }

      function dragstart(event) {
        $scope.$emit("temperature-slider.dragstart", event);
      }

      var $button = $('.temperature-button');
      $ionicGesture.on("dragstart", dragstart, $button);
      $ionicGesture.on("drag", drag, $button);
      $ionicGesture.on("dragend", dragend, $button);
    }
  };
});
