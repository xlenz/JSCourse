'use strict';

BookManager.Views.Books = Backbone.View.extend({
  tagName: 'section',
  className: 'grid books align-center',
  template: _.template($('#tpl-books').html()),

  renderOne: function (contact) {
    var itemView = new BookManager.Views.Book({
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
