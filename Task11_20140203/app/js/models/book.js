'use strict';

BookManager.Models.Book = Backbone.Model.extend({
  defaults: {
    title: null,
    subtitle: null,
    publisher: null,
    publishedDate: null,
    language: null
  },

  initialize: function () {
    console.log('book model initialized.');
  }
});
