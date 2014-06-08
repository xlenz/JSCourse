'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('TabCtrl', function ($scope, $http, ActiveTab, Token) {
      $scope.tabs = [];
      $http({
         method: 'GET',
         url: '/js/tabs.json'
      }).success(function (data) {
         $scope.tabs = data;
      }).error(function (error) {
         console.log('failed to load tabs content', error);
      });

      $scope.isCurrent = function (id) {
         return ActiveTab.get() === id;
      };

      $scope.hide = function (id) {
         return (Token.get() && $scope.tabs[id].hide) || (!Token.get() && !$scope.tabs[id].hide);
      };
   });
})();
