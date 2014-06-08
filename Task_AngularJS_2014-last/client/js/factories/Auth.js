'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.factory('Auth', function () {
      var token = null;
      return {
         getToken: function () {
            return token;
         },
         setToken: function (_token) {
            token = _token;
         },
         isAuthenticated: function () {
            if (token === null) {
               return false;
            }
            return true;
         }
      };
   });

})();
