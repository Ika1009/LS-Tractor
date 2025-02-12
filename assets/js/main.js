(function ($) {
    "use strict";

    /* Tab to top */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $(".back-to-top").fadeIn();
        } else {
            $(".back-to-top").fadeOut();
        }
    });

    /* Footer Toggle  */
    $(document).ready(function () {
        $(".cr-footer-links").addClass("active-drop-footer");

        $('.cr-sub-title').append("<div class='cr-heading-res'><i class='ri-arrow-down-s-line' aria-hidden='true'></i></div>");

        $(".cr-sub-title .cr-heading-res").on("click", function () {
            var $this = $(this).closest('.footer-top .cr-footer-border').find('.cr-footer-dropdown');
            $this.slideToggle('slow');
            $('.cr-footer-dropdown').not($this).slideUp('slow');
        });
    });

    /* Footer year */
    var date = new Date().getFullYear();

    document.getElementById("copyright_year").innerHTML = date;

    /* Back to top button progress */
    var progressPath = document.querySelector('.back-to-top-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 50;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top-wrap').addClass('active-progress');
        } else {
            jQuery('.back-to-top-wrap').removeClass('active-progress');
        }
    });
    jQuery('.back-to-top-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({ scrollTop: 0 }, duration);
        return false;
    })
})(jQuery);
