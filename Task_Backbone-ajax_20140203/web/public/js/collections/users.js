'use strict';

UserManager.Collections.Users = Backbone.Collection.extend({
  model: UserManager.Models.User,

  initialize: function () {
    console.log('Users collection initialized.');
  }
});
