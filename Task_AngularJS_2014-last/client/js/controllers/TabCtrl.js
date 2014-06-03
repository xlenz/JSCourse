'use strict';

(function () {
   var app = angular.module('angularSpa');

   //do not hardcode somehow
   var tabs = [{
      name: 'Login',
      href: 'login'
   }, {
      name: 'Signup',
      href: 'signup'
   }, {
      name: 'My Profile',
      href: 'me'
   }, {
      name: 'List my dates!',
      href: 'list'
   }];

   app.controller('TabCtrl', function ($scope) {
      $scope.tabs = tabs;
      $scope.activeTab = 0;

      $scope.setTab = function (id) {
         $scope.activeTab = id;
      };

      $scope.isCurrent = function (id) {
         return $scope.activeTab === id;
      };
   });
})();
