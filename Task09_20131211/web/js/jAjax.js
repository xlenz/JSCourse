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
var tplUserList = '<li><div class="person {sex}" iid="{userId}"><a class="url n" href="#show-full"><i>{title}</i> {firstName} {lastName}</a></div></li>';
var tplUser = '<div><h2>{title} {firstName} {lastName}</h2><section><h3>Location</h3>Street: {street}, {city}, {state}, {zip}</section><section><h3>Connect with him!</h3><a href="mailto:{email}">{email}</a><br/>Cell: <a href="tel:{cell}">{cell}</a><br/>Phone: <a href="tel:{phone}">{phone}</a></section></div>';

$('section.top-bar-section li a').each(function (i, el) {
    $(el).on('click', function () {
        $('section.top-bar-section li').removeClass('active');
        $(this).parent().toggleClass('active');
        hideTabs();
    });
});

$('#signup form').on('submit', function (e) {
    e.preventDefault();
    var form = this;
    var data = $(form).serializeArray();
    console.log(data);
    $.ajax({
        type: "POST",
        url: urls.signup,
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function (res) {
            $('html, body').animate({
                scrollTop: $("#login").offset().top
            }, 200);
            $('section.top-bar-section li').removeClass('active');
            $('section.top-bar-section li a[href="#signup"]').parent().hide(); //comment to debug
            $('section.top-bar-section li a[href="#login"]').parent().toggleClass('active');
            hideTabs();
            $('#userInfo i').text('User ' + data[0].value + ' successfully created!').parent().removeClass('hide');
            console.log(res);
        },
        error: function (res) {
            authErr(res, form);
            console.log('err: signup', res);
        }
    });
});

$('#login form').on('submit', function (e) {
    e.preventDefault();
    var form = this;
    var data = $(form).serializeArray();
    console.log(data);
    $.ajax({
        type: "POST",
        url: urls.login,
        crossDomain: true,
        data: data,
        dataType: 'json',
        success: function (res) {
            console.log('ok: login', res);
            $('#userCreated').remove();
            $('section.top-bar-section li').removeClass('active');
            $('section.top-bar-section li a[href!="#list"]').parent().hide(); //comment to debug
            $('section.top-bar-section li a[href="#list"]').parent().removeClass('hide');
            $('section.top-bar-section li a[href="#list"]').parent().toggleClass('active');
            hideTabs();
            $('#userInfo i').text('Welcome, ' + data[0].value).parent().removeClass('hide');
            token = res.token;
        },
        error: function (res) {
            authErr(res, form);
            console.log('err: login', res);
        }
    });
});

$(document).ready(function () {
    hideTabs();
    $.ajax({
        type: "GET",
        url: urls.users,
        crossDomain: true,
        dataType: 'json',
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
            $('#list ul li a').each(function (i, el) {
                var userId = $(el).parent().attr('iid');
                $(el).on('click', function () {
                    if (!token) {
                        alert('Please login.');
                        return;
                    }
                    $('#show-full div').remove();
                    $('#show-full').removeClass('hide');
                    $('#show-full img').toggleClass('hide');
                    $.ajax({
                        url: urls.user + userId,
                        headers: {
                            'SECRET-TOKEN': token
                        },
                        type: 'GET',
                        success: function (data) {
                            console.log('ok: userId', data);
                            var usrInfo = JSON.parse(data)[0].user;
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
                            $('#show-full img').toggleClass('hide');
                            $('#show-full').append(userHtml);
                        },
                        error: function (data) {
                            console.log('err: userId', data);
                            $('#show-full img').toggleClass('hide');
                        }
                    });
                });
            });
        },
        error: function (res) {
            console.log('err: userList', res);
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
    $('small', form).removeClass('hide').addClass('error').text(errorMsg || 'Something went wrong!');
}

function hideTabs() {
    $('section.top-bar-section li[class!="active"] a').each(function (i, el) {
        var hideTab = $(el).attr('href');
        $(hideTab).hide();
    });
    var showTab = $('section.top-bar-section li[class="active"] a').attr('href');
    $(showTab).show();
}

