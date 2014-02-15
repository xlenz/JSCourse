'use strict';

UserManager.Views.Users = Backbone.View.extend({
  template: _.template($('#tpl-Users').html()),

  renderOne: function (contact) {
    var itemView = new UserManager.Views.User({
      model: contact
    });
    this.$el.append(itemView.render().$el);
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);

    this.collection.each(this.renderOne, this);

    return this;
  }
});
