'use strict';

(function () {
   var app = angular.module('angularSpa', ['ngRoute']);

   app.run(function(Auth, $rootScope, $location) {
      $rootScope.$on('$routeChangeStart', function(evt, next) {
         if(!Auth.isAuthenticated() && next.templateUrl !== 'view/signup.html'){
            $location.url("/login");
         }
         else if (Auth.isAuthenticated() && next.templateUrl !== 'view/list.html'){
            $location.url("/me");
         }
         event.preventDefault();
      });
   });

   app.constant('ApiUrl', 'http://localhost:3000');

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
