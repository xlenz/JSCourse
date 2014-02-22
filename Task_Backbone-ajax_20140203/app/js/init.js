'use strict';

$.ajaxSetup({
  crossDomain: true,
  dataType: 'json',
  error: function (res) {
    console.error(res);
  }
});

$(function () {
  console.log('Initializing UserManager');
  $.ajax({
    type: "GET",
    url: config.urls.users,
    success: function (res) {
      UserManager.start({
        users: res
      });
    }
  });
});
