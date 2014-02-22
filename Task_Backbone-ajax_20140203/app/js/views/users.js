'use strict';

UserManager.Views.Users = Backbone.View.extend({
  template: _.template($('#tpl-Users').html()),
  tagName: 'ul',
  className: 'small-block-grid-3',

  renderOne: function (user) {
    var itemView = new UserManager.Views.User({
      model: user
    });
    this.$el.append(itemView.render().$el);
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);

    this.collection.forEach(this.renderOne, this);

    return this;
  },

  events: {
    'click a': 'showUser'
  },
  showUser: function (e) {
    var token = config.token;
    if (!token) {
      window.alert('Please login.');
      return;
    }
    var userId = $(e.toElement).parent().attr('iid');
    var loadingImg = $('#show-full').find('img').toggleClass('hide');
    $.ajax({
      url: config.urls.user + userId,
      headers: {
        'SECRET-TOKEN': token
      },
      type: 'GET',
      complete: function (data) {
        loadingImg.toggleClass('hide');
      }
    });
  }
});
