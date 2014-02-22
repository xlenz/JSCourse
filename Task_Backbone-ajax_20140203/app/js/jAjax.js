'use strict';

$('section.top-bar-section').on('click', 'a', function () {
  var tab = $(this).parent();
  tab.siblings().removeClass('active');
  tab.toggleClass('active');
  hideTabs();
});

$('#signup form').on('submit', function (e) {
  e.preventDefault();
  var form = this;
  var data = $(form).serializeArray();
  console.log('form:', data);
  $.ajax({
    type: "POST",
    url: config.urls.signup,
    data: data,
    success: function (res) {
      console.log('ok: signup', res);
      var tabs = $('section.top-bar-section li');
      tabs.removeClass('active');
      tabs.find('a[href="#signup"]').parent().hide(); //comment to debug
      tabs.find('a[href="#login"]').parent().toggleClass('active');
      hideTabs();
      $('#userInfo i').text('User ' + data[0].value +
        ' successfully created!').parent().removeClass('hide');
    },
    error: function (res) {
      console.error(res);
      authErr(res, form);
    }
  });
});

$('#login form').on('submit', function (e) {
  e.preventDefault();
  var form = this;
  var data = $(form).serializeArray();
  console.log('form:', data);
  $.ajax({
    type: "POST",
    url: config.urls.login,
    data: data,
    success: function (res) {
      console.log('ok: login', res);
      $('#userCreated').remove();
      var tabs = $('section.top-bar-section li');
      tabs.removeClass('active').siblings().toggleClass('hide');
      tabs.find('a[href="#list"]').parent().toggleClass('active');
      hideTabs();
      $('#userInfo i').text('Welcome, ' + data[0].value).parent().removeClass(
        'hide');
      config.token = res.token;
    },
    error: function (res) {
      console.error(res);
      authErr(res, form);
    }
  });
});

function authErr(res, form) {
  var errorMsg = '';
  var errors = res.responseJSON.errors;
  if (errors) {
    for (var i = 0; i < errors.length; i++) {
      var err = errors[i];
      Object.keys(err).forEach(function (key) {
        errorMsg += err[key] + ';';
      });
    }
  }
  $('small', form).removeClass('hide').addClass('error').text(errorMsg ||
    'Something went wrong!');
}

function hideTabs() {
  var navMenu = $('section.top-bar-section');
  navMenu.find('li[class!="active"] a').each(function (i, el) {
    var hideTab = $(el).attr('href');
    $(hideTab).addClass('hide');
  });
  var showTab = navMenu.find('li[class="active"] a').attr('href');
  $(showTab).removeClass('hide');
}

/*
$(document).ready(function () {
  $('#list ul').on('click', 'a', function () {
    var userId = $(this).parent().attr('iid');

    var showUser = $('#show-full').removeClass('hide');
    showUser.find('div').remove();
    showUser.find('img').toggleClass('hide');
    $.ajax({
      url: UserManager.config.urls.user + userId,
      headers: {
        'SECRET-TOKEN': UserManager.config.token
      },
      type: 'GET',
      success: function (data) {
        console.log('ok: userId', data);
        var usrInfo = data[0].user;
        var userHtml = tplUser.format({
          title: capitalize(usrInfo.name.title),
          firstName: capitalize(usrInfo.name.first),
          lastName: capitalize(usrInfo.name.last),
          city: usrInfo.location.city,
          state: usrInfo.location.state,
          street: usrInfo.location.street,
          zip: usrInfo.location.zip,
          phone: usrInfo.phone,
          cell: usrInfo.cell,
          email: usrInfo.email
        });
        showUser.append(userHtml).find('img').toggleClass('hide');
      },
      error: function (data) {
        console.error(data);
        showUser.find('img').toggleClass('hide');
      }
    });

  });

});
*/
