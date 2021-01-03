(function ($) {

    $(window).on('load', function () {
        // hide shipping address in checkout.html
        $(".shipping-address").hide();

        // hide shipping address in checkout.html
        $(".take_away_div").hide();
    });

    // populate hidden element with localstorage for posting
    $(".payment").on('click', function () {
        let token = localStorage.getItem('my_cart_local');
        $('#cart_object').val(token);
    });

    // main address shipping checkbox
    $('.f_s_delivery').change(function() {
        if (this.checked) {
            $(".shipping-address").hide(100);
        } else {
            $(".shipping-address").show(100);
        }
    });
    // credit radio by default
    $('input:radio[name="p_method"]').filter('[value="credit"]').attr('checked', true);
    // delivery radio by default
    $('input:radio[name="s_method"]').filter('[value="delivery"]').attr('checked', true);
    // shipping method radio for delivery
    $('#s_method-1').click(function() {
        if($('#s_method-1').is(':checked')) {
            $(".delivery_div").show(100);
            $(".take_away_div").hide(100);
        }
    });

    // shipping method radio for take_away
    $('#s_method-0').click(function() {
        if($('#s_method-0').is(':checked')) {
            $(".take_away_div").show(100);
            $(".delivery_div").hide(100);
        }
    });
    // shipping method radio for take away

})(jQuery);