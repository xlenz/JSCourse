'use strict';

UserManager.Views.User = Backbone.View.extend({
  template: _.template($('#tpl-User').html()),
  tagName: 'li',

  render: function () {
    var usr = this.model;
    Object.keys(usr.user.name).forEach(function (key) {
      usr.user.name[key] = capitalize(usr.user.name[key]);
    });
    var html = this.template(usr);
    this.$el.append(html);
    return this;
  }
});
