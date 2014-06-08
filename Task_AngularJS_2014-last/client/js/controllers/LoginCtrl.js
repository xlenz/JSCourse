'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('LoginCtrl', function ($scope, $http, ActiveTab, ApiClient) {
      ActiveTab.set(0);
      $scope.user = {};
      $scope.error = null;

      $scope.submit = function (value) {
         if ($scope.loginForm.$valid) {
            post(value);
         }
      };
      var post = function () {
         var promise = ApiClient.login($scope.user);
         promise.then(
            function (data) {
               $scope.error = null;
            },
            function (data) {
               $scope.error = data.error || 'Failed to login.';
            }
         );
      };
   });
})();
