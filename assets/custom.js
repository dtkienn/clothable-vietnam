$(document).ready(function() {
    productTab();
    productThumb();
    handleCartDrawer();
    updateQtyCart();
    validateFormAccount();
    showPassword();
    changeToDate();
    stickyHeader();
});

function productTab() {
    $('.js-tab-header').on('click', function() {
        if(!$(this).hasClass('active')) {
            let dataTab = $(this).data('tab');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.tab-content, .tab-accordion').removeClass('active');
            $('.tab-content[data-tab="'+dataTab+'"], .tab-accordion[data-tab="'+dataTab+'"]').addClass('active');
        }
    });

    $('.tab-accordion-js').on('click', function() {
        if(!$(this).hasClass('active')) {
            let dataTab = $(this).data('tab');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $(this).next().addClass('active');
            $('.tab-header').removeClass('active');
            $('.tab-header[data-tab="'+dataTab+'"]').addClass('active');
        } else {
            $('.tab-header, .tab-content, .tab-accordion').removeClass('active');
        }
    });

    $(window).on('resize', function(){
        if ($(window).width() >= 750) {
            if ($('.tab-header.active').length == 0) {
                $('.tab-header[data-tab="description"], .tab-content[data-tab="description"], .tab-accordion[data-tab="description"]').addClass('active');
            }
        }
    });
}

function productThumb() {
    if($('.js-thumb-dot').length > 0) {
        $('.js-thumb-dot').on('click', function() {
            let dataIndex = $(this).data('index');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('html, body').animate({
                scrollTop: $('.product-single__media-wrapper[data-index="'+dataIndex+'"]').offset().top
            }, 1000);
        });

        $(window).scroll(function() {
            var windowscroll = $(window).scrollTop();
            $('.product-single__media-wrapper').each(function(i) {
                if ($(this).position().top <= windowscroll) {
                    $('.js-thumb-dot').removeClass('active');
                    $('.js-thumb-dot').eq(i).addClass('active');
                }
            });
        }).scroll();
    }
}

function handleCartDrawer() {
    $('.open-cart-drawer-js').on('click', function(e) {
        e.preventDefault();
        $('body').addClass('sidebar-cart-open');
    });
    $('.close-cart-drawer-js, .cart-drawer-bg').on('click', function() {
        $('body').removeClass('sidebar-cart-open');
    });
}

function updateQtyCart() {
    $('body').on('click', '.js-qty-action', function() {
        let quantity = $(this).data('quantity'),
            lineId = $(this).data('line');

        $.ajax({
            url:'/cart/change.js',
            type: 'POST',
            data:{ quantity: quantity, line: lineId },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                fetch('/cart?view=drawer&timestamp=' + Date.now(), {
                    credentials: 'same-origin',
                    method: 'GET'
                }).then(function (content) {
                    content.text().then(function (html) {
                        $('[data-cart-content]').html(html);
                    });
                });
            }
        });
    });
}

function validateFormAccount() {
    if($("[data-form='login']").length > 0) {
        $("[data-form='login']").validate({
            rules: {
                "customer[email]": { required: !0, email: true },
                "customer[password]": { required: !0, minlength: 5 },
            },
            messages: {
                "customer[email]": { required: "This field is required.", email: "Incorrect e-mail" },
                "customer[password]": { required: "This field is required.", minlength: "The minimum length is 5 characters" },
            }
        });
    }

    if($("[data-form='forgot_password']").length > 0) {
        $("[data-form='forgot_password']").validate({
            rules: {
                email: { required: !0, email: true },
            },
            messages: {
                email: { required: "This field is required.", email: "Incorrect e-mail" },
            },
        });
    }

    if($("[data-form='register']").length > 0) {
        $("[data-form='register']").validate({
            rules: {
                "customer[first_name]": { required: !0, minlength: 2 },
                "customer[last_name]": { required: !0, minlength: 2 },
                "customer[note][city]": "required",
                "customer[note][birthday]": "required",
                "customer[email]": { required: !0, email: true },
                "customer[password]": { required: !0, minlength: 5 },
            },
            messages: {
                "customer[first_name]": { required: "This field is required.", minlength: "The minimum length is 2 characters" },
                "customer[last_name]": { required: "This field is required.", minlength: "The minimum length is 2 characters" },
                "customer[note][city]": { required: "This field is required." },
                "customer[note][birthday]": { required: "This field is required." },
                "customer[email]": { required: "This field is required.", email: "Incorrect e-mail" },
                "customer[password]": { required: "This field is required.", minlength: "The minimum length is 5 characters" },
            },
        });
    }
}

function showPassword() {
    $('.show-password').click(function(){
        $(this).toggleClass('showed');
        if ($(this).hasClass('showed')) {
            $(this).parent().find('input').attr('type', 'password');
        } else {
            $(this).parent().find('input').attr('type', 'text');
        }
    });
}

function changeToDate() {
    $('.form-group--date input[type="text"]').click(function(){
        $(this).attr('type', 'date');
    });
}

function stickyHeader() {
    $(window).scroll(function(){
        if($(this).scrollTop() > 0){
            $('body').addClass('header-sticky');
        } else {
            $('body').removeClass('header-sticky');
        }
    });
}