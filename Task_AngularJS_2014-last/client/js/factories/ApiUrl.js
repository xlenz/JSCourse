'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.factory('ApiUrl', function ($location) {
      var apiHost = null; //override SpaApi url
      var apiUrl = 'http://' + (apiHost || $location.$$host) + ':3000';
      return apiUrl;
   });

})();
