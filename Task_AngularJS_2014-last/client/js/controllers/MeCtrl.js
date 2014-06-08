'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('MeCtrl', function ($scope, ActiveTab) {
      ActiveTab.set(2);
   });
})();
