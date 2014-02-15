'use strict';

UserManager.Models.User = Backbone.Model.extend({
  defaults: {
    name: null
  },

  initialize: function () {
    console.log('User model initialized.');
  }
});
