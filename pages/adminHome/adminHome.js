$(document).ready(function () {
    var adminHome = (function () {
        var init = function () {
            getRooms();
            getVisitors();
        };

        var addRoom = function () {

            var room = {
                "number": $("#inputNumber").val(),
                "rating": (Math.random() * (10) + 0.0200).toFixed(1),
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
                    $('.rooms tbody').html('');
                    getRooms();
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

        var removeRoom = function (id) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/rooms/delete/" + id,
                success: function (result) {
                    getRooms();
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

        var getRooms = function () {
            $('.rooms tbody').html('');
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/rooms/getAll",
                success: function (result) {
                    console.log(result)
                    $.each(result, function (i, visitor) {
                        // console.log(result)
                        var room = "<tr><td>" + result[i].number + "</td><td>" + result[i].roomClass + "</td><td>" + result[i].price + "</td><td>" + result[i].rating + "</td><td>" + result[i].wiFi + "</td><td>" + result[i].conditioning + "</td><td>" + result[i].petFriendly + "</td><td>-</td><td><span room-number='" + result[i].number + "' class='rmv glyphicon glyphicon-remove' aria-hidden='true'></span></td></tr>";
                        $('.rooms tbody').append(room);
                    });
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Rooms list is up to date!');
                    document.querySelectorAll('.rmv').forEach(function (item) {
                        item.addEventListener('click', function () {
                            removeRoom(item.getAttribute('room-number'));
                        })
                    })
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
            $('.visitors tbody').html('');
            $('.employees tbody').html('');
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/users/all",
                success: function (result) {
                    $.each(result, function (i, visitor) {
                        console.log(result)
                        if (result[i].type == "Admin") {
                            var visitor = "<tr><td>" + result[i].id + "</td><td>" + result[i].firstName + "</td><td>" + result[i].lastName + "</td><td>" + result[i].email + "</td><td><span user-number='" + result[i].id + "' class='rmvUser glyphicon glyphicon-remove' aria-hidden='true'></span></td></tr>";
                            $('.employees tbody').append(visitor)
                        } else if (result[i].type == "User") {
                            var visitor = "<tr><td>" + result[i].id + "</td><td>" + result[i].firstName + "</td><td>" + result[i].lastName + "</td><td>" + result[i].email + "</td><td>" + (result[i].reservationsNum == null ? '-' : result[i].reservationsNum) + "</td><td><span user-number='" + result[i].id + "' class='rmvUser glyphicon glyphicon-remove' aria-hidden='true'></span></td></tr>";
                            $('.visitors tbody').append(visitor)
                        }
                    });
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Users list is up to date!');
                    document.querySelectorAll('.rmvUser').forEach(function (item) {
                        item.addEventListener('click', function () {
                            removeUser(item.getAttribute('user-number'));
                        })
                    })
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

        var removeUser = function (id) {
            $.ajax({
                type: "DELETE",
                url: "http://localhost:8080/users/delete/" + id,
                success: function (result) {
                    getVisitors();
                },
                error: function (e) {
                    $.notifyDefaults({
                        type: 'danger',
                        allow_dismiss: false
                    });
                    $.notify('Something went wrong!');
                }
            });
        }

        var addReservation = function () {
            var reservation = {
                "room": $('.ri').val(),
                "bodies": $('.rt').val(),
                "owner": $('.fn').val() + $('.ln').val(),
                "ownerId": $('.ui').val(),
                "price": $('.rp').val(),
                "start": $('.sd').val(),
                "end": $('.ed').val()
            }

            
            console.log(reservation);


            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8080/reservations/add",
                data: JSON.stringify(reservation),
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

        }

        var getReservation = function () {
            var reserv = {
                "number": $("#inputNumber").val(),
                "rating": (Math.random() * (10) + 0.0200).toFixed(1),
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
                url: "http://localhost:8080/reservations/filterSearch",
                data: JSON.stringify(reserv),
                dataType: 'json',
                success: function (result) {
                    console.log(result)
                    $.notifyDefaults({
                        type: 'success',
                        allow_dismiss: false
                    });
                    $.notify('Room added successfully!');
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
        }



        return {
            init: init,
            addRoom: addRoom,
            removeRoom: removeRoom,
            getRooms: getRooms,
            getVisitors: getVisitors,
            addReservation: addReservation
        };
    })();
    adminHome.init();


    $('#addRoom').click(function () {
        adminHome.addRoom();
    })

    $('.removeRoom').click(function () {
        adminHome.removeRoom();
    })

    $('#makeReservation').click(function () {
        adminHome.addReservation();
    })
})