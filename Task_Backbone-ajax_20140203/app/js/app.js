'use strict';

window.UserManager = {
  Models: {},
  Collections: {},
  Views: {},

  start: function (data) {
    console.log('UserManager started', data);
    var users = new UserManager.Collections.Users(data);
    var usersView = new UserManager.Views.Users({
      collection: data.users
    });
    $('#list').append(usersView.render().$el);
  }
};

var config = {
  apiUrl: 'http://146.185.170.180/',
  token: null
};

config.urls = {
  signup: config.apiUrl + 'signup',
  login: config.apiUrl + 'login',
  users: config.apiUrl + 'users',
  user: config.apiUrl + 'user/'
};

function capitalize(s) {
  return !s ? s : s.substring(0, 1).toUpperCase() + s.substring(1);
}

