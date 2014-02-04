'use strict';

window.BookManager = {
  Models: {},
  Collections: {},
  Views: {},

  start: function (data) {
    console.log('BookManager started');
    var volumeInfo = [];
    _.each(data.books, function (val) {
      volumeInfo.push(val.volumeInfo);
    });

    var books = new BookManager.Collections.Books(volumeInfo);
    var booksView = new BookManager.Views.Books({
      collection: books
    });
    $('h1').after(booksView.render().$el);
  }
};
