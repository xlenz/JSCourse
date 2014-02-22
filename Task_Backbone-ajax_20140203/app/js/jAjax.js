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
  var errors = res.responseJSON.errors;
  var errorMsg = res.responseJSON.error || '';
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
