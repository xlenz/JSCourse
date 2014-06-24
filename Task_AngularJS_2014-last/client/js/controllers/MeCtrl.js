'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('MeCtrl', function ($scope, ActiveTab, ApiClient, Auth) {
      ActiveTab.set(2);
      $scope.profile = {};
      $scope.avatar = {};
      $scope.user = {};

      ApiClient.user('me')
         .then(
         function (data) {
            delete data._id;
            $scope.profile = data;
         },
         function (data) {
            console.error(data);
         }
      );

      $scope.submit = function (value) {
         if ($scope.profileForm.$valid) {
            post(value);
         }
      };

      //no error handling here
      var post = function () {
         var promise = ApiClient.updateProfile($scope.profile);
         promise.then(
            function (data) {
               console.log(data);
            },
            function (data) {
               console.error(data);
            }
         );
      };

   });
})();
