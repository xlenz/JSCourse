'use strict';

UserManager.Views.User = Backbone.View.extend({
  template: _.template($('#tpl-User').html()),

  initialize: function () {
    console.log('User view initialized.');
  },

  render: function () {
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  }
});
