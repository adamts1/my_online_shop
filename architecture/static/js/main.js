// 'use strict';

(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        // if ($('.featured__filter').length > 0) {
        //     var containerEl = document.querySelector('.featured__filter');
        //     var mixer = mixitup(containerEl);
        // }
    });

    /*------------------
        Header menu active after refresh added by me
    --------------------*/
    $(document).ready(function () {
        $("li").click(function () {
            var id = $(this).attr("id");
            $('#' + id).siblings().find(".active").removeClass("active");
            $('#' + id).addClass("active");
            localStorage.setItem("selectedolditem", id);
        });

        var selectedolditem = localStorage.getItem('selectedolditem');
        if (selectedolditem != null) {
            $('#' + selectedolditem).siblings().find(".active").removeClass("active");
            $('#' + selectedolditem).addClass("active");
        }
        else{
            $('#home_menu').addClass("active");
        }

        get_local_storage_to_html();

    });

    function get_local_storage_to_html() {
        // total items
        try {
            var existed_data = JSON.parse(localStorage.getItem("my_cart_local"));
            var total_cart_items = existed_data.cart_items;
            var total_price = existed_data.cart_total;
            // cart icon top page
            $("#total_type_amount_number")[0].innerHTML = total_cart_items;
            // popup header
            $(".num_of_items")[0].innerHTML = total_cart_items;
            // price to pay
            $(".price_tp_pay")[0].innerHTML = total_price.toFixed(2);
        }
        catch(err) {
        }
        // items amount
        try {
            var quantities_data = existed_data.cart_quantities;
            Object.keys(quantities_data).forEach(function (val, key) {
                $("[data-product_id=" + val + "]").find("input").attr("value", quantities_data[val]);
            })
            // Populate popup
            $(".cart_overview").empty();
            var name_data = existed_data.item_names;
            var pic_data = existed_data.pic_path_items;
            var prices_data = existed_data.cart_prices;
            Object.keys(quantities_data).forEach(function (val, key) {
                add_item_popup(pic_data[val], prices_data[val], quantities_data[val], name_data[val],val);
            })}
        catch(err) {
        }


    }
    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });


    /*------------------
		Navigation
	--------------------*/
    // $(".mobile-menu").slicknav({
    //     prependTo: '#mobile-menu-wrap',
    //     allowParentLinks: true
    // });

    /*-----------------------
        Categories Slider
    ------------------------*/
    $(".categories__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {

            0: {
                items: 1,
            },

            480: {
                items: 2,
            },

            768: {
                items: 3,
            },

            992: {
                items: 4,
            }
        }
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*-------------------
		Quantity change
	--------------------- */
    // var proQty = $('.pro-qty');
    // proQty.prepend('<span class="dec qtybtn">-</span>');
    // proQty.append('<span class="inc qtybtn">+</span>');
    // proQty.on('click', '.qtybtn', function () {
    //     var $button = $(this);
    //     var oldValue = $button.parent().find('input').val();
    //     if ($button.hasClass('inc')) {
    //         var newVal = parseFloat(oldValue) + 1;
    //     } else {
    //         // Don't allow decrementing below zero
    //         if (oldValue > 0) {
    //             var newVal = parseFloat(oldValue) - 1;
    //         } else {
    //             newVal = 0;
    //         }
    //     }
    //     $button.parent().find('input').val(newVal);
    // });

    // create cart obj
    function createCartJSON() {
        this.cart_total = 0;
        this.cart_items = 0;
        this.cart_quantities = [];
        this.cart_prices = [];
        this.pic_path_items = [];
        this.item_names = [];
    }

    // create local storage - create if not exists
    $(function() {
        if (!localStorage.getItem("my_cart_local")) {
            var my_cart_obj=new createCartJSON();
            localStorage.setItem('my_cart_local', JSON.stringify(my_cart_obj));
        }
    });

    function update_local_storage(){
        let data_obj = JSON.parse(localStorage.getItem('my_cart_local'));
        var total_cart_items = Object.keys(data_obj["cart_prices"]).length;
        data_obj["cart_items"] = total_cart_items;

        var item_prices = data_obj.cart_prices;
        var item_quantity = data_obj.cart_quantities;
        var total_price = 0;
        Object.keys(item_prices).forEach(function(val, key){
            total_price = total_price + (item_prices[val] * item_quantity[val]);
        })
        data_obj["cart_total"] = total_price;
        localStorage.setItem("my_cart_local", JSON.stringify(data_obj));

        //localStorage.setItem('my_cart_local', JSON.stringify(prevData));
    }

    // update objects attributes in local storage (price \ amount \ pic \ name)
    function update_objects(value, product_id, product_amount_price){
        let prevData = JSON.parse(localStorage.getItem('my_cart_local'));

        Object.keys(value).forEach(function(val, key){
            if (prevData[val].length == 0) {
                // if first item has been chosen
                prevData[val] = value[val]
            }else{
                prevData[val][product_id] = product_amount_price;
            }
        })
        localStorage.setItem('my_cart_local', JSON.stringify(prevData));
    }

    // add to chart button

    $(".add_button").on('click', function () {
        // Get Item data
        var product_id = $(this).closest(".product__item").attr("data-product_id");
        var product_amount = $(this).closest(".product__item").attr("data-quantity");
        var product_price = $(this).closest(".product__item").attr("data-product_price");
        var product_pic_path = $(this).closest('.product__item').find(".product__item__pic").attr("data-setbg");
        var product_name = $(this).closest(".product__item").attr("product_name");
        if (product_amount != 0) {
            // Init temp obj for prices and quantities
            var quantities_obj = {};
            quantities_obj[product_id] = product_amount;
            var price_obj = {};
            price_obj[product_id] = product_price;
            var pic_obj = {};
            pic_obj[product_id] = product_pic_path;
            var name_obj = {};
            name_obj[product_id] = product_name;

            // update obj in local storage
            update_objects({cart_quantities: quantities_obj}, product_id, product_amount)
            update_objects({cart_prices: price_obj}, product_id, product_price)
            update_objects({pic_path_items: pic_obj}, product_id, product_pic_path)
            update_objects({item_names: name_obj}, product_id, product_name)

            // update local storage
            update_local_storage();

            // set html element with prev chosen values from local storage
            get_local_storage_to_html();
            $.show_animation(this);

        }else{
            delete_item(product_id)
        }
    });

    function add_item_popup(pic_path, price, amount, name, id){
        var price_item = price*amount;
        //delete icon
        var trash_div = $('<div>', {class: 'trash'});
        var trash_icon = $('<i>', {class: 'fa fa-trash'});
        trash_div = trash_div.html(trash_icon)


        var img_div = $('<div>', {class: 'cart_img'});
        var img = $('<img>').attr('width','80').attr('height','60').attr('src',pic_path);
        img_div = img_div.html(img)

        // Cart title
        var cart_title_col = $('<div>', {class: 'cart_title_col'});
        var item_title = $('<div>', {class: 'item_title'});
        var span_in_item_title = $('<span>', {class: 'float-right'}).text(name);
        var item_info = $('<div>');
        var item_info_span = $('<span>', {class: 'item_info'}).text(price);
        item_info = item_info.append(item_info_span);
        item_title = item_title.html(span_in_item_title).add(item_info);
        cart_title_col = cart_title_col.html(item_title);

        // Order Detail
        var order_detail = $('<div>', {class: 'item_order_detail'});
        var item_weight = $('<div>', {class: 'item_weight'});
        var weight_span= $('<span>', {class: 'weight'}).text(amount);
        var meas_unit_span = $('<span>', {class: 'meas_unit'}).text(" קילו");
        item_weight = item_weight.html(weight_span).append(meas_unit_span);

        var price_per_weight =  $('<div>', {class: 'item_price_per_weight'});
        var total_price_span=  $('<span>', {class: 'total_price'}).text(price_item.toFixed(2));
        var currency_span =  $('<span>', {class: 'currency'}).text("₪");
        price_per_weight = price_per_weight.html(total_price_span).append(currency_span);
        order_detail = order_detail.html(item_weight).append(price_per_weight);

        $( ".cart_overview" ).append( $('<div>', {class: 'cart_row'}).attr('item_id',id).append(trash_div).append(img_div).append(cart_title_col).append(order_detail));
    }

    function delete_item(item_id){
        let data_obj = JSON.parse(localStorage.getItem('my_cart_local'));
        delete data_obj.cart_prices[item_id];
        delete data_obj.cart_quantities[item_id];
        delete data_obj.item_names[item_id];
        delete data_obj.pic_path_items[item_id];
        localStorage.setItem('my_cart_local', JSON.stringify(data_obj));
        update_local_storage();
        get_local_storage_to_html();

    }

    $(document).on('click','.trash',function()
    {
        delete_item($(this).closest(".cart_row").attr("item_id"));
    });

    //Decrease product amount customized
    $(".fa-minus").on('click', function () {
        var product_amount = $(this.nextElementSibling).val();
        if ( product_amount>0 ) {
            product_amount = product_amount -1;
            $(this.nextElementSibling).val(product_amount);
            $(this).closest(".product__item").attr("data-quantity", product_amount);
            //alert($(this).closest("div"))
        };
    });

    // Increase product amount added by me
    $(".fa-plus").on('click', function () {
        var product_amount = $(this).prev().val();
        product_amount = parseInt(product_amount);
        product_amount = product_amount +1;
        $(this).prev().val(product_amount);
        $(this).closest(".product__item").attr("data-quantity", product_amount);
    });

    /*-------------------
        Cart Status pop-up
    --------------------- */


    $(".cart_icon").on('click', function () {
        $(".cart_popup").addClass("show__cart_popup__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay, .popup_close").on('click', function () {
        $(".cart_popup").removeClass("show__cart_popup__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('.header__top').hide(300);
            $('.header__nav_bar').addClass("fixed");

        } else {
            if($('header').width() > 986){
                $('.header__top').show(300);
                $('.header__nav_bar').removeClass( "fixed" );
            }

        }
        // }

    });
// Mobile popup (right)
    $("a.left_arrow").on('click', function () {
        $(this).toggleClass("left_arrow_open")
        $(this).parent().next().toggleClass("sub_dropdown_mobile_open")
    });


})(jQuery);