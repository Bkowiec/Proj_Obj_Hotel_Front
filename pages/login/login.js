$(document).ready(function () {
    var login = (function () {
        var signIn = function () {
            var User = {
                "email": $("#inputEmail").val(),
                "password": $("#inputPassword").val()
            }
console.log(User)
            // DO POST
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/users/email",
                data: JSON.stringify(User),
                dataType: 'json',
                success: function (result) {
                    console.log(result)
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Account logged successfully!');

                    localStorage.setItem('currentUser', JSON.stringify(result))

                    if (result.type == "User") {
                        document.location.pathname = "/pages/userHome/userHome.html";
                    } else if (result.type == "Admin") {
                        document.location.pathname = "/pages/adminHome/adminHome.html";
                    }
                },
                error: function (e) {
                    console.log(e)
                    $.notifyDefaults({
                        type: 'danger',
                        allow_dismiss: false
                    });
                    $.notify('Something went wrong!');
                }
            });
            cleanUp();
        };
        var cleanUp = function () {
            $("#inputEmail").val('');
            $("#inputPassword").val('');
        };
        var isLogged = function () {
            if (localStorage.getItem('currentUser')) {
                var user = JSON.parse(localStorage.getItem('currentUser'));
                console.warn('Witaj ' + user.email);
                if (user.type == "User") {
                    document.location.pathname = "/pages/userHome/userHome.html";
                } else if (user.type == "Admin") {
                    document.location.pathname = "/pages/adminHome/adminHome.html";
                }
            } else {}
        };
        return {
            signIn: signIn,
            isLogged: isLogged
        };
    })();

    login.isLogged();

    $(".form-signin").submit(function (event) {
        event.preventDefault();

        login.signIn();
    });
});