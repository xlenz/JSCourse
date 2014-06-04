'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('TabCtrl', function ($scope, $q, $http) {
      $scope.tabs = [];
      $http({
         method: 'GET',
         url: '/js/tabs.json'
      }).success(function (data) {
         $scope.tabs = data;
      }).error(function (error) {
         console.log('failed to load tabs content', error);
      });

      $scope.activeTab = 0;

      $scope.setTab = function (id) {
         $scope.activeTab = id;
      };

      $scope.isCurrent = function (id) {
         return $scope.activeTab === id;
      };
   });
})();
