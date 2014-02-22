'use strict';

UserManager.Views.UserInfo = Backbone.View.extend({
  template: _.template($('#tpl-UserInfo').html()),
  tagName: 'div',

  render: function () {
    var usr = this.model;
    Object.keys(usr.name).forEach(function (key) {
      usr.name[key] = capitalize(usr.name[key]);
    });
    var html = this.template(usr);
    this.$el.append(html);
    return this;
  }
});
