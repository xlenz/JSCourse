'use strict';

BookManager.Collections.Books = Backbone.Collection.extend({
  model: BookManager.Models.Book,

  initialize: function () {
    console.log('books collection initialized.');
  }
});
