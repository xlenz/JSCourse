var apiUrl = 'http://www.jscacourse.co.vu/';
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
