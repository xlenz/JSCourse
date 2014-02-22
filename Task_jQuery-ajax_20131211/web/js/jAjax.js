'use strict';
//http://176.104.244.32/
var apiUrl = 'http://146.185.170.180/';
var urls = {
    signup: apiUrl + 'signup',
    login: apiUrl + 'login',
    users: apiUrl + 'users',
    user: apiUrl + 'user/'
};
var token = null;
var tplUserList = '<li><div class="person {sex}" iid="{userId}"><a class="url n" href="#show-full">' +
                          '<i>{title}</i> {firstName} {lastName}</a></div></li>';
var tplUser = '<div><h2>{title} {firstName} {lastName}</h2>' +
                     '<section><h3>Location</h3>Street: {street}, {city}, {state}, {zip}</section>' +
                     '<section><h3>Connect with user!</h3><a href="mailto:{email}">{email}</a>' +
                     '<br/>Cell: <a href="tel:{cell}">{cell}</a>'+
                     '<br/>Phone: <a href="tel:{phone}">{phone}</a></section></div>';

$('section.top-bar-section').on('click', 'a', function () {
    var tab = $(this).parent();
    tab.siblings().removeClass('active');
    tab.toggleClass('active');
    hideTabs();
});

$.ajaxSetup({
    crossDomain: true,
    dataType: 'json',
    error: function (res) {
        console.error(res);
    }
});

$('#signup form').on('submit', function (e) {
    e.preventDefault();
    var form = this;
    var data = $(form).serializeArray();
    console.log('form:', data);
    $.ajax({
        type: "POST",
        url: urls.signup,
        data: data,
        success: function (res) {
            console.log('ok: signup', res);
            var tabs = $('section.top-bar-section li');
            tabs.removeClass('active');
            tabs.find('a[href="#signup"]').parent().hide(); //comment to debug
            tabs.find('a[href="#login"]').parent().toggleClass('active');
            hideTabs();
            $('#userInfo i').text('User ' + data[0].value + ' successfully created!').parent().removeClass('hide');
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
        url: urls.login,
        data: data,
        success: function (res) {
            console.log('ok: login', res);
            $('#userCreated').remove();
            var tabs = $('section.top-bar-section li');
            tabs.removeClass('active').siblings().toggleClass('hide');
            tabs.find('a[href="#list"]').parent().toggleClass('active');
            hideTabs();
            $('#userInfo i').text('Welcome, ' + data[0].value).parent().removeClass('hide');
            token = res.token;
        },
        error: function (res) {
            console.error(res);
            authErr(res, form);
        }
    });
});

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: urls.users,
        success: function (res) {
            console.log('ok: userList', res);
            var len = res.length;
            for (var i = 0; i < len; i++) {
                var usr = res[i];
                var userHtml = tplUserList.format({
                    sex: usr.user.gender,
                    title: capitalize(usr.user.name.title),
                    firstName: capitalize(usr.user.name.first),
                    lastName: capitalize(usr.user.name.last),
                    userId: usr.id
                });
                $('#list ul').append(userHtml);
            }
            $('#list ul').on('click', 'a', function () {
                var userId = $(this).parent().attr('iid');
                if (!token) {
                    alert('Please login.');
                    return;
                }
                var showUser = $('#show-full').removeClass('hide');
                showUser.find('div').remove();
                showUser.find('img').toggleClass('hide');
                $.ajax({
                    url: urls.user + userId,
                    headers: {
                        'SECRET-TOKEN': token
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
        }
    });
});

if (!String.prototype.format) {
    String.prototype.format = function () {
        var str = this.toString();
        if (!arguments.length) {
            return str;
        }
        var args = (("string" == args || "number" == args) ? arguments : arguments[0]);
        Object.keys(args).forEach(function (arg) {
            str = str.replace(new RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
        });
        return str;
    };
}

function capitalize(s) {
    return !s ? s : s.substring(0, 1).toUpperCase() + s.substring(1);
}

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

