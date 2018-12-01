$(document).ready(function () {
    var adminHome = (function () {
        var init = function () {
            getRooms();
            getVisitors();
        };

        var addRoom = function () {

            var room = {
                "number": $("#inputNumber").val(),
                "rating": $("#inputEmail").val(),
                "price": $("#inputPrice").val(),
                "wiFi": $("#wifi").is(':checked'),
                "conditioning": $("#conditioning").is(':checked'),
                "petFriendly": $("#petFriendly").is(':checked'),
                "roomClass": $("#typeRoom").val()
            }
            // DO POST
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/rooms/add",
                data: JSON.stringify(room),
                dataType: 'json',
                success: function (result) {
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Room added successfully!');
                },
                error: function (e) {
                    $.notifyDefaults({
                        type: 'danger',
                        allow_dismiss: false
                    });
                    $.notify('Something went wrong!');
                }
            });
        };

        var removeRoom = function () {
            $.notifyDefaults({
                type: 'success',
                allow_dismiss: false
            });
            $.notify('Room removed successfully!');
            getRooms();
        };

        var getRooms = function () {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/rooms/getAll",
                success: function (result) {
                    $.each(result, function (i, visitor) {
                        console.log(result)
                            var room ;
                            $('.employees tbody').append(visitor) 
                    });
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Users list is up to date!');
                },
                error: function (e) {
                    $.notifyDefaults({
                        type: 'danger',
                        allow_dismiss: false
                    });
                    $.notify('Something went wrong!');
                }
            });
        };

        var getVisitors = function () {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/users/all",
                success: function (result) {
                    $.each(result, function (i, visitor) {
                        console.log(result)
                        if (result[i].type == "Admin") {
                            var visitor = "<tr><td>" + result[i].firstName + "</td><td>" + result[i].lastName + "</td><td>" + result[i].email + "</td></tr>";
                            $('.employees tbody').append(visitor)
                        } else if (result[i].type == "User") {
                            var visitor = "<tr><td>" + result[i].firstName + "</td><td>" + result[i].lastName + "</td><td>" + result[i].email + "</td><td>" + (result[i].reservationsNum == null ? '-' : result[i].reservationsNum) + "</td></tr>";
                            $('.visitors tbody').append(visitor)
                        }
                    });
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Users list is up to date!');
                },
                error: function (e) {
                    $.notifyDefaults({
                        type: 'danger',
                        allow_dismiss: false
                    });
                    $.notify('Something went wrong!');
                }
            });
        };

        return {
            init: init,
            addRoom: addRoom,
            removeRoom: removeRoom,
            getRooms: getRooms,
            getVisitors: getVisitors
        };
    })();
    adminHome.init();


    $('#addRoom').click(function () {
        adminHome.addRoom();
    })

    $('.removeRoom').click(function () {
        adminHome.removeRoom();
    })

})