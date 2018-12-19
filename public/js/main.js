$( document ).ready(function() {
    $( "a.btn" ).click(function( event ) {
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
    });
});