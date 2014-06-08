'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.controller('TabCtrl', function ($scope, $http, ActiveTab, Auth) {
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
         var isAuth = Auth.isAuthenticated();

         // some tabs are hidden after logon
         //other tabs are hidden until logon
         var hideOnAuth = $scope.tabs[id].hide;

         return (isAuth && hideOnAuth) || (!isAuth && !hideOnAuth);
      };
   });
})();
