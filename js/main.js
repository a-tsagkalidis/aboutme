(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Projects isotope and filter
    var projectsIsotope = $('.projects-container').isotope({
        itemSelector: '.projects-item',
        layoutMode: 'fitRows'
    });
    $('#projects-flters li').on('click', function () {
        $("#projects-flters li").removeClass('active');
        $(this).addClass('active');

        projectsIsotope.isotope({filter: $(this).data('filter')});
    });
    

    // Dark Mode Toggle with enhanced animation
    $('.dark-mode-toggle').click(function () {
        // Add a small spin animation when clicked
        $(this).css('animation', 'spin 0.7s ease');
        
        setTimeout(() => {
            $(this).css('animation', $('body').hasClass('dark-mode') ? 'pulse 3s infinite' : 'glow 3s infinite');
        }, 700);
        
        $('body').toggleClass('dark-mode');
        
        // Change icon based on mode
        if ($('body').hasClass('dark-mode')) {
            $(this).find('i').removeClass('fa-moon').addClass('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            $(this).find('i').removeClass('fa-sun').addClass('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
        
        return false;
    });

    // Add the spin animation keyframes through JavaScript
    const style = document.createElement('style');
    style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`;
    document.head.appendChild(style);

    // Check for saved dark mode preference when page loads
    $(document).ready(function() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            $('body').addClass('dark-mode');
            $('.dark-mode-toggle').find('i').removeClass('fa-moon').addClass('fa-sun');
            $('.dark-mode-toggle').css('animation', 'glow 3s infinite');
        }
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

