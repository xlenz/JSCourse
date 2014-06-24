'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('MeCtrl', function ($scope, ActiveTab, ApiClient, Auth) {
      ActiveTab.set(2);
      $scope.profile = {};
      $scope.avatar = {};
      $scope.user = {};

      console.log($scope.profile);

      ApiClient.user('me')
         .then(
         function (data) {
            $scope.profile.email = data.email;
            $scope.profile.avatar = data.avatar;
         },
         function (data) {
            console.log(data);
            //$scope.errors = data.errors || ['Failed to signup.'];
         }
      );

      $scope.submit = function (value) {
         if ($scope.profileForm.$valid) {
            post(value);
         }
      };
      var post = function () {
         var promise = ApiClient.updateProfile($scope.profile);
         promise.then(
            function (data) {
               console.log(data);
               //$scope.errors = [];
            },
            function (data) {
               console.log(data);
               //$scope.errors = data.errors || ['Failed to signup.'];
            }
         );
      };

   });
})();
