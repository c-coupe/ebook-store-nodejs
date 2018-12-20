$( document ).ready(function() {
    $( "a.buyProduct" ).click(function( event ) {
        if (true !== userIsConnected) {
            $('#myModal').modal()
        } else {
            var that = this;
            $.ajax({
                url: "/order",
                data: {
                    id: $(this).data("id")
                },
                type: "POST",
                dataType : "json",
            })
            .done(function( json ) {
                $(that).parent().prev().find('span').text(json.orders_count);
            })
            .fail(function( xhr, status, errorThrown ) {
                alert( "Sorry, there was a problem! " + xhr.responseText );
                console.log( "Error: " + errorThrown );
                console.log( "Status: " + status );
                console.dir( xhr );
            });
            event.preventDefault();
        }
    });
});