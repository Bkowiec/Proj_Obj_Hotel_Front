$(document).ready(function () {
    var logged = (function () {
        var isLogged = function () {
            if (localStorage.getItem('currentUser')) {
                var user = JSON.parse(localStorage.getItem('currentUser'));
                console.warn('Witaj ' + user.email);
            } else {
                document.location = 'http://127.0.0.1:5500/pages/login/login.html';
            }
        };
        var logOut = function () {
            localStorage.removeItem('currentUser');
            this.isLogged();
        };
        return {
            isLogged: isLogged,
            logOut: logOut
        };
    })();
    logged.isLogged();


    $(".logOut").click(function () {
        logged.logOut();
    });


});