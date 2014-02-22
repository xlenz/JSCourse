'use strict';

UserManager.Views.User = Backbone.View.extend({
  template: _.template($('#tpl-User').html()),
  tagName: 'li',

  render: function () {
    var html = this.template(this.model);
    this.$el.append(html);
    return this;
  }
});
