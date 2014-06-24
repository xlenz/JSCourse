'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('ListCtrl', function ($scope, ActiveTab, ApiClient) {
      ActiveTab.set(3);

      $scope.isLoading = false;
      $scope.users = [];
      $scope.selectedUser = {};

      ApiClient.listUsers().then(
         function (data) {
            console.log(data);
            angular.forEach(data, function (value, key) {
               data[key] = adjustSex(data[key]);
            });
            $scope.users = data;
         },
         function (data) {
            console.error(data);
         }
      );

      $scope.viewUser = function (userId) {
         $scope.isLoading = true;
         ApiClient.user(userId).then(
            function (data) {
               $scope.isLoading = false;
               console.log(data);
               $scope.selectedUser = adjustSex(data);
            },
            function (data) {
               $scope.isLoading = false;
               console.error(data);
            }
         );
      };

      function adjustSex(user) {
         if (user.sex === 'male') {
            user.mrMrs = 'Mr.';
            user.himHer = 'him';
         }
         else if (user.sex === 'female') {
            user.mrMrs = 'Mrs.';
            user.himHer = 'her';
         }
         return user;
      }
   });
})();
