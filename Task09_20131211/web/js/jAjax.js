var apiUrl = 'http://146.185.170.180/';
var urls = {
      signup: apiUrl + 'signup'
    , login: apiUrl + 'login'
    , users: apiUrl + 'users'
    , user: apiUrl + 'user/'
};

$('div#signup form input[type="submit"]').on('click', function(e) {
    e.preventDefault();
    var data = {};
    data.login = $(this).parent().find('input[name="login"]').val();
    data.email = $(this).parent().find('input[name="email"]').val();
    data.password = $(this).parent().find('input[name="password"]').val();
    data.passwordConfirmation = $(this).parent().find('input[name="passwordConfirmation"]').val();
    console.log(data);
    $.ajax({
          type: "POST"
        , url: urls.signup
        , crossDomain: true
        , data: data
        , dataType: 'json'
        , success: function (res) {
            console.log(res);
        }
        , error: function (res) {
            console.log(res);
        }
    });
});

$('div#login form input[type="submit"]').on('click', function(e) {
    e.preventDefault();
    var data = {};
    data.login = $(this).parent().find('input[name="login"]').val();
    data.password = $(this).parent().find('input[name="password"]').val();
    console.log(data);
    $.ajax({
          type: "POST"
        , url: urls.login
        , crossDomain: true
        , data: data
        , dataType: 'json'
        , success: function (res) {
            console.log(res);
        }
        , error: function (res) {
            console.log(res);
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
        }
        , error: function (res) {
            console.log('fuckup', res);
        }
    });
});















