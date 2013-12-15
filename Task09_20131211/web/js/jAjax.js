'use strict';
//http://176.104.244.32/
var apiUrl = 'http://146.185.170.180/';
var urls = {
      signup: apiUrl + 'signup'
    , login: apiUrl + 'login'
    , users: apiUrl + 'users'
    , user: apiUrl + 'user/'
};
var token = null;
var tplUserList = '<li><div class="person {sex}" iid="{userId}"><a class="url n" href="#show-full"><i>{title}</i> {firstName} {lastName}</a></div></li>';
var tplUser = '<div><h2>{title} {firstName} {lastName}</h2><section><h3>Location</h3>Street: {street}, {city}, {state}, {zip}</section><section><h3>Connect with him!</h3><a href="mailto:{email}">{email}</a><br/>Cell: <a href="tel:{cell}">{cell}</a><br/>Phone: <a href="tel:{phone}">{phone}</a></section></div>';

$('section.top-bar-section li').each(function() {
    $(this).on('click', function() {
        $('section.top-bar-section li').removeClass();
        $(this).toggleClass('active');
    });
});

$('#signup form').on('submit', function(e) {
    e.preventDefault();
    var form = this;
    var data = $(form).serializeArray();
    console.log(data);
    $.ajax({
          type: "POST"
        , url: urls.signup
        , crossDomain: true
        , data: data
        , dataType: 'json'
        , success: function (res) {
            $('html, body').animate({
                scrollTop: $("#login").offset().top
            }, 200);
            $('#signup').remove();
            $('section.top-bar-section li').removeClass();
            $('section.top-bar-section li a[href="#signup"]').parent().remove();
            $('section.top-bar-section li a[href="#login"]').parent().toggleClass('active');
            $('hr:first').append('<i id="userCreated">User ' + data[0].value + ' successfully created!</i>');
            console.log(res);
        }
        , error: function (res) {
            authErr(res, form);
            console.log('err: signup', res);
        }
    });
});

$('#login form').on('submit', function(e) {
    e.preventDefault();
    var form = this;
    var data = $(form).serializeArray();
    console.log(data);
    $.ajax({
          type: "POST"
        , url: urls.login
        , crossDomain: true
        , data: data
        , dataType: 'json'
        , success: function (res) {
            $('#login').remove();
            $('#signup').remove();
            $('#userCreated').remove();
            $('section.top-bar-section li').removeClass();
            $('section.top-bar-section li a[href!="#list"]').parent().remove();
            $('section.top-bar-section li a[href="#list"]').parent().toggleClass('active');
            $('hr:first').append('<i>Welcome, ' + data[0].value + '</i>');
            token = res.token;
            console.log(token);
        }
        , error: function (res) {
            authErr(res, form);
            console.log('err: login', res);
        }
    });
});

$(document).ready(function() {
    $.ajax({
          type: "GET"
        , url: urls.users
        , crossDomain: true
        , dataType: 'json'
        , success: function (res) {
            console.log('cool', res);
            var len = res.length;
            for (var i = 0; i < len; i++) {
                var usr = res[i];
                var userHtml = tplUserList.format({
                      sex: usr.user.gender
                    , title: capitalize(usr.user.name.title)
                    , firstName: capitalize(usr.user.name.first)
                    , lastName: capitalize(usr.user.name.last)
                    , userId: usr.id
                });
                $('#list ul').append(userHtml);
            }
            $('#list ul li a').each(function() {
                var userId = $(this).parent().attr('iid');
                $(this).on('click', function() {
                    if (!token) {
                        alert('Please login.');
                        return;
                    }
                    $('#show-full div').remove();
                    $('#show-full').removeClass('hide');
                    $('#show-full img').toggleClass('hide');
                    $.ajax({
                        url: urls.user + userId,
                        headers: {'SECRET-TOKEN': token},
                        type: 'GET',
                        success: function (data) {
                            console.log('ok: userId', data);
                            var usrInfo = JSON.parse(data)[0].user;
                            var userHtml = tplUser.format({
                                  title: capitalize(usrInfo.name.title)
                                , firstName: capitalize(usrInfo.name.first)
                                , lastName: capitalize(usrInfo.name.last)
                                , city: usrInfo.location.city
                                , state: usrInfo.location.state
                                , street: usrInfo.location.street
                                , zip: usrInfo.location.zip
                                , phone: usrInfo.phone
                                , cell: usrInfo.cell
                                , email: usrInfo.email
                            });
                            $('#show-full img').toggleClass('hide');
                            $('#show-full').append(userHtml);
                        },
                        error: function (data) {
                            $('#show-full img').toggleClass('hide');
                            console.log('err: userId', data);
                        }
                    });
                });
            });
        }
        , error: function (res) {
            console.log('err: userList', res);
        }
    });
});

if (!String.prototype.format) {
    String.prototype.format = function () {
        var str = this.toString();
        if (!arguments.length)
            return str;
        var args = typeof arguments[0],
            args = (("string" == args || "number" == args) ? arguments : arguments[0]);
        for (var arg in args)
            str = str.replace(RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
        return str;
    }
}

function capitalize (s) {
    return !s ? s : s.substring(0, 1).toUpperCase() + s.substring(1);
}

function authErr (res, form) {
    var errorMsg = '';
    var errors = res.responseJSON.errors;
    if (errors) {
        for (var i = 0; i < errors.length; i++){
            var err = errors[i];
            Object.keys(err).forEach(function(key) {
                errorMsg += err[key] + ';';
            });
        }
    }
    $('small', form).removeClass('hide').addClass('error').text(errorMsg || 'Something went wrong!');
}






















