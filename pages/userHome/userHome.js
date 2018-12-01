$(document).ready(function () {
    var userHome = (function () {
        var init = function () {
            $('.input-daterange').datepicker({
                format: 'dd-mm-yyyy'
            });
            $("#range_03").ionRangeSlider({
                type: "double",
                grid: true,
                min: 0,
                max: 1000,
                from: 0,
                to: 1000,
                postfix: "zł"
            });
            getRooms();
        };

        var getFree = function () {
            var searchObj = {
                start: $('#datepicker [name="start"]').val(),
                end: $('#datepicker [name="end"]').val()
            }

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/rooms/getFree",
                success: function (result) {
                    $.each(result, function (i, visitor) {
                        console.log(result)
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

            console.log(searchObj);
        };

        var getSearch = function () {
            var searchObj = {
                start: $('#datepicker [name="start"]').val(),
                end: $('#datepicker [name="end"]').val(),
                priceStart: $('#range_03').val().split(';')[0],
                priceEnd: $('#range_03').val().split(';')[1],
                adult: $('#typeAdult').val(),
                children: $('#typeChild').val(),
                rating: $('#typeRating').val(),
                typpe: $('#typeRoom').val(),
                wifi: $("#wifi").is(':checked'),
                conditioning: $("#conditioning").is(':checked'),
                petFriendly: $("#petFriendly").is(':checked')
            }

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/reservations/filterSearch",
                success: function (result) {
                    $.each(result, function (i, visitor) {
                        console.log(result)
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

            console.log(searchObj);
        };

        var getRooms = function () {
            console.log('Rooms updated')
        };

        return {
            init: init,
            getSearch: getSearch,
            getFree: getFree
        };
    })();
    userHome.init();


    $('#search').click(function () {
        userHome.getSearch();
    })

    $('#checkDate').click(function () {
        userHome.getFree();
    })


    $('#book').click(function () {
        document.location.pathname = "/pages/reservation/reservation.html";
    })


})