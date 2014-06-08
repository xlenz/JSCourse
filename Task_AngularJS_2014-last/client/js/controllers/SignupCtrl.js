'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('SignupCtrl', function ($scope, ActiveTab, ApiClient) {
      ActiveTab.set(1);
      $scope.user = {};
      $scope.errors = [];
      $scope.passwordMatch = true;

      $scope.submit = function (value) {
         if ($scope.user.password === $scope.user.passwordConfirmation) {
            $scope.passwordMatch = true;
         }
         else {
            $scope.passwordMatch = false;
         }
         if ($scope.signupForm.$valid && $scope.passwordMatch) {
            post(value);
         }
      };
      var post = function () {
         var promise = ApiClient.signup($scope.user);
         promise.then(
            function (data) {
               $scope.errors = [];
            },
            function (data) {
               $scope.errors = data.errors || ['Failed to signup.'];
            }
         );
      };
   });
})();
