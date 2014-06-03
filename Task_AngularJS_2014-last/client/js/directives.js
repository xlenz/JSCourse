'use strict';

(function () {
  var app = angular.module('angularSpa');
  app.directive("tabManager", function () {
    return {
      restrict: 'E',
      templateUrl: 'view/tabManager.html'
    };
  });
})();
