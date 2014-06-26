'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('ListCtrl', function ($scope, ActiveTab, ApiClient, ApiUrl) {
      ActiveTab.set(3);

      $scope.isLoading = false;
      $scope.users = [];
      $scope.selectedUser = {};

      ApiClient.listUsers().then(
         function (data) {
            angular.forEach(data, function (value, key) {
               data[key] = adjustSex(data[key]);
               if (data[key].avatar.indexOf('://') === -1) {
                  data[key].avatar = ApiUrl + '/' + data[key].avatar;
               }
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
               if ($scope.selectedUser.avatar.indexOf('://') === -1) {
                  $scope.selectedUser.avatar = ApiUrl + '/' + $scope.selectedUser.avatar;
               }
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
