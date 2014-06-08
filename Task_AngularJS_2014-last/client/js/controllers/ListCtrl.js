'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('ListCtrl', function ($scope, ActiveTab) {
      ActiveTab.set(3);
   });
})();
