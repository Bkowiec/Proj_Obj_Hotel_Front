$(document).ready(function () {
    var registration = (function () {
        var signUp = function () {
            var User = {
                "type": $("#typeSelect").val(),
                "firstName": $("#inputFirstname").val(),
                "lastName": $("#inputLastname").val(),
                "email": $("#inputEmail").val(),
                "password": $("#inputPassword").val()
            }

            // DO POST
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/users/register",
                data: JSON.stringify(User),
                dataType: 'json',
                success: function (result) {
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Account added successfully!<br>Hello ' + User.firstname);
                    document.location.pathname = "/pages/login/login.html";
                },
                error: function (e) {
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
            $("#inputFirstname").val('');
            $("#inputLastname").val('');
            $("#inputEmail").val('');
            $("#inputPassword").val('');
            $("#typeSelect").val('');
        };

        return {
            signUp: signUp
        };
    })();

    $(".form-signup").submit(function (event) {
        event.preventDefault();

        registration.signUp();
    });
});