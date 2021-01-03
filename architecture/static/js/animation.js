(function ($) {

    // $(".add_button").on('click', function () {

    // });

    $.show_animation = function(current_element){
        var start = $(current_element).closest('.product__item').find(".product__item__pic");
        var product_pic_path = start.attr("data-setbg");
        var img_div = $('<div>', {class: 'div_anima'});
        var img = $('<img>', {class: 'img_anima'}).attr('width','80').attr('height','60').attr('src',product_pic_path);
        var img_div = img_div.html(img);
        var end_position = $( ".header__cart" ).offset();
        var start_position = $(current_element).offset()
        $(start).append(img_div);
        $('<style>@-webkit-keyframes test{0% {left:'+start_position.left+'px; top:'+(start_position.top-$(document).scrollTop())+'px;opacity: 2;}100% {opacity: 0.6; left:'+end_position.left+'px; top:'+(end_position.top-$(document).scrollTop())+'px; overflow: hidden;visibility: hidden;}</style>').appendTo("a");
    }

})(jQuery);