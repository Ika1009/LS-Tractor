(function ($) {
    "use strict";

    /*== New Product ==*/
    $('.new-product-slider').owlCarousel({
        loop: true,
        margin: 24,
        responsiveClass: true,
        dots: false,
        nav: true,
        navText: ["<i class='ri-arrow-left-line'></i>", "<i class='ri-arrow-right-line'></i>"],
        pagination: false,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1200: {
                items: 4,
            },
            1400: {
                items: 5,
            }
        }
    })

    /*== Category ==*/
    $('.category-slider').owlCarousel({
        loop: true,
        margin: 24,
        responsiveClass: true,
        dots: false,
        nav: false,
        pagination: false,
        responsive: {
            0: {
                items: 1,
            },
            380: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            },
            1400: {
                items: 6,
            }
        }
    })

    /* Insta slider  */
    new Swiper('.cr-insta', {
        speed: 500,
        spaceBetween: 24,
        autoplay: false,
        disableOnInteraction: true,
        loop: true,
        slidesPerView: 2,
        allowTouchMove: true,
        centeredSlides: false,
        breakpoints: {
            420: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
            1400: {
                slidesPerView: 8,
            }
        }
    });

    /* main tabs-Tailwindcss */
    $("#mycollectionTab li:first-child").addClass("active");
    $(".tab-collection-pane").hide();
    $(".tab-collection-pane:first").show();
    $("#mycollectionTab li").click(function () {
        $("#mycollectionTab li").removeClass("active");
        $(this).addClass("active");
        $(".tab-collection-pane").hide();
        var activeTab = $(this).find("a").attr("href");
        $(activeTab).fadeIn();
        return false;
    });

    /*== location Toggle MenuBar ==*/
    $('.loc-list').on('click', function () {
        var mslocname = $(this).find('.cr-detail').html();
        $(".cr-location-title").html(mslocname);
        $(".cr-location-title").parent().attr("title", mslocname);
    });

})(jQuery);
