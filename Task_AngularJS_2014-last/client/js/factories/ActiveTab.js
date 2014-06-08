'use strict';

(function () {
   var app = angular.module('angularSpa');

   app.factory('ActiveTab', function () {
      var activeTab = 0;
      return {
         get: function () {
            return activeTab;
         },
         set: function (id) {
            activeTab = id;
         }
      };
   });

})();
