'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('ListCtrl', function ($scope, ActiveTab, ApiClient) {
      ActiveTab.set(3);

      $scope.users = [];
      $scope.selectedUser = {};

      var promise = ApiClient.listUsers();
      promise.then(
         function (data) {
            console.log(data);
            angular.forEach(data, function (value, key) {
               if (data[key].sex === 'male') {
                  data[key].mrMrs = 'Mr.';
                  data[key].himHer = 'him';
               }
               else if (data[key].sex === 'female') {
                  data[key].mrMrs = 'Mrs.';
                  data[key].himHer = 'her';
               }
            });
            $scope.users = data;
         },
         function (data) {
            console.log(data);
         }
      );

      $scope.viewUser = function (user) {
         $scope.selectedUser = user;
      };
   });
})();
