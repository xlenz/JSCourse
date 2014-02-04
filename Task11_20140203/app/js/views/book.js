'use strict';

BookManager.Views.Book = Backbone.View.extend({
  className: 'unit w-1-3',
  template: _.template($('#tpl-book').html()),

  initialize: function () {
    console.log('book view initialized.');
  },

  render: function () {
    var html = this.template(this.model.toJSON());
    this.$el.append(html);
    return this;
  }
});
