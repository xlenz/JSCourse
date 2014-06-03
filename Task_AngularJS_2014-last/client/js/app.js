'use strict';

(function () {
   var app = angular.module('angularSpa', ['ngRoute']);
   app.config(function ($routeProvider) {
      $routeProvider
         .when('/login', {
            templateUrl: 'view/login.html',
            controller: 'LoginCtrl'
         })
         .when('/signup', {
            templateUrl: 'view/signup.html',
            controller: 'SignupCtrl'
         })
         .when('/list', {
            templateUrl: 'view/list.html',
            controller: 'ListCtrl'
         })
         .when('/me', {
            templateUrl: 'view/me.html',
            controller: 'MeCtrl'
         })
         .otherwise({
            redirectTo: '/login'
         });
   });

})();
