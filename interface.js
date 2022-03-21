(function ($) {
    'use strict';


    /*-------------------------------------------------------------------------------
     Detect mobile device
     -------------------------------------------------------------------------------*/


    var mobileDevice = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('mobile');
        mobileDevice = true;
    }

    else {
        $('html').addClass('no-mobile');
        mobileDevice = false;
    }


    /*-------------------------------------------------------------------------------
     Window load
     -------------------------------------------------------------------------------*/


    $(window).load(function () {

        $('.loader').fadeOut();

        var wow = new WOW({
                offset: 100,
                mobile: false
            }
        );
        wow.init();
    });

    var navbar = $('.js-navbar-affix');
    var navbarAffixHeight = 73


    /*-------------------------------------------------------------------------------
     Smooth scroll to anchor
     -------------------------------------------------------------------------------*/


    $('.js-target-scroll, .navbar-nav li a[href^="#"]').on('click', function () {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });


    /*-------------------------------------------------------------------------------
     Affix
     -------------------------------------------------------------------------------*/


    navbar.affix({
        offset: {
            top: 12
        }
    });

    navbar.on('affix.bs.affix', function () {
        if (!navbar.hasClass('affix')) {
            navbar.addClass('animated slideInDown');
            navbar.find('.js-brand-hinge').addClass('animated hinge');
        }
    });

    navbar.on('affix-top.bs.affix', function () {
        navbar.removeClass('animated slideInDown');
        $('.navbar-collapse').collapse('hide');
    });


    /*-------------------------------------------------------------------------------
     Navbar collapse
     -------------------------------------------------------------------------------*/


    $('.navbar-collapse').on('show.bs.collapse', function () {
        navbar.addClass('affix');
    });

    $('.navbar-collapse').on('hide.bs.collapse', function () {
        if (navbar.hasClass('affix-top')) {
            navbar.removeClass('affix');
        }
    });

    $(".navbar-nav > li > a").on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });


    /*-------------------------------------------------------------------------------
     Scrollspy
     -------------------------------------------------------------------------------*/


    $('body').scrollspy({
        offset: navbarAffixHeight + 1
    });

    $(".partners-carousel").owlCarousel({
        itemsMobile: [479, 1],
        itemsTablet: [768, 2],
        itemsDesktopSmall: [979, 3],
        items: 4,
        responsiveRefreshRate: 0,
        autoHeight: true
    });


    /*-------------------------------------------------------------------------------
     Parallax
     -------------------------------------------------------------------------------*/


    if (!mobileDevice) {
        $(window).stellar({
            responsive: true,
            horizontalScrolling: false,
            hideDistantElements: false,
            horizontalOffset: 0,
            verticalOffset: 0
        });
    }


    /*-------------------------------------------------------------------------------
     Pie charts
     -------------------------------------------------------------------------------*/


    $(window).scroll(function () {

        $('.chart').each(function (i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $('.chart').easyPieChart({
                    scaleColor: false,
                    trackColor: '#ebedee',
                    barColor: function (percent) {
                        var ctx = this.renderer.getCtx();
                        var canvas = this.renderer.getCanvas();
                        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
                        gradient.addColorStop(0, "#e35e5b");
                        gradient.addColorStop(1, "#febf28");
                        return gradient;
                    },
                    lineWidth: 6,
                    lineCap: false,
                    rotate: 180,
                    size: 180,
                    animate: 1000
                });
            }
        });
    });


    /*-------------------------------------------------------------------------------
     Video pop-up
     -------------------------------------------------------------------------------*/


    $('.js-play').magnificPopup({
        type: 'iframe',
        removalDelay: 300
    });


    /*-------------------------------------------------------------------------------
     Reviews carousel
     -------------------------------------------------------------------------------*/


    $(".review-carousel").owlCarousel({
        itemsTablet: [768, 1],
        itemsDesktopSmall: [979, 2],
        itemsDesktop: [1199, 3],
        items: 3,
        responsiveRefreshRate: 0,
        autoHeight: true
    });

    /*-------------------------------------------------------------------------------
     Reviews carousel
     -------------------------------------------------------------------------------*/


    $(".gallery-carousel").owlCarousel({
        singleItem: true,
        autoHeight: true,
        pagination: false,
        navigation: true,
        transitionStyle: "fadeUp",
        navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    });



    /*-------------------------------------------------------------------------------
     Ajax Form 2
     -------------------------------------------------------------------------------*/


    if ($('.js-ajax-form').length) {
        $('.js-ajax-form').each(function () {
            $(this).validate({
                errorClass: 'error wobble-error',
                submitHandler: function (form) {
                    $.ajax({
                        type: "POST",
                        url: vanessa_obj.ajaxurl,
                        data: 'action=vanessa_mail_send&' + $(form).serialize(),
                        success: function (res) {
                            if (res == '1') {
                                $('.modal').modal('hide');
                                $('#success').modal('show');
                            } else {
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            }
                        },

                        error: function () {
                            $('.modal').modal('hide');
                            $('#error').modal('show');
                        }
                    });
                }
            });
        });
    }
//Subscribe

    if ($('#mc-form').length) {
        $('#mc-form').each(function () {
            $(this).validate({
                errorClass: 'error wobble-error',
                submitHandler: function (form) {
                    jQuery('#mc-form .btn').attr('disabled', true);
                    $.ajax({
                        type: "POST",
                        url: vanessa_obj.ajaxurl,
                        data: 'action=vanessa_mailchimp_send&' + $(form).serialize(),
                        success: function (res) {
                            jQuery('#success .modal-subtitle').html(res);
                            $('.modal').modal('hide');
                            $('#success').modal('show');
                            jQuery('#mc-form .btn').attr('disabled', false);

                        },


                        error: function (res) {
                            $('.modal').modal('hide');
                            $('#error').modal('show');
                            jQuery('#error .modal-subtitle').html(res);
                            jQuery('#mc-form .btn').attr('disabled', false);

                        }
                    });
                }
            });
        });
    }


    if ($('.js-comment-form2').length) {
        $('.js-comment-form2').each(function () {
            $(this).validate({
                errorClass: 'error wobble-error',
                submitHandler: function (form) {
                    $.ajax({
                        type: "POST",
                        url: vanessa_obj.ajaxurl,
                        data: 'action=vanessa_comment_send&' + $(form).serialize(),
                        success: function (res) {
                            if (res == '1') {
                                $('.modal').modal('hide');
                                $('#success').modal('show');
                            } else {
                                $('.modal').modal('hide');
                                $('#error').modal('show');
                            }

                        },

                        error: function () {
                            $('.modal').modal('hide');
                            $('#error').modal('show');
                        }
                    });
                }
            });
        });
    }



})(jQuery);

if (typeof  initialize_map == undefined) {
    function initialize_map() {

    }
}