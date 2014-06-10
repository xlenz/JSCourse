'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.factory('User', function () {
      var user = null;
      return {
         get: function () {
            return user;
         },
         set: function (_user) {
            user = _user;
         }
      };
   });

})();
