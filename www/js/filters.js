angular.module('weatherGuess.filters', [])

.filter('round', function() {
  return function(number) {
    if (typeof number === 'undefined' || number === null) {
      return '';
    } else {
    var matches = String(number).match(/^(-?\d+\.\d).*/);
      if (matches) {
        return "" + matches[1];
      } else {
        return "";
      }
    }
  };
});
