;(function($) {
    "use strict"; 

    //* Navbar Fixed  
    function navbarFixed(){
        if ( $('.main-header-area').length ){ 
            $(window).on('scroll', function() {
                var scroll = $(window).scrollTop();   
                if (scroll >=290) {
                    $(".main-header-area").addClass("navbar-fixed").fadeIn();
                } else {
                    $(".main-header-area").removeClass("navbar-fixed");
                }
            });
        };
    };
    
    // sidebar_menu All Page/
    $("#menu-opener").on('click', function () {
        $(".sidebar-menus").toggleClass("active");
    });
    $("section, .remove-one").on('click', function () {
        $(".sidebar-menus, .remove-one").removeClass("active");
    });
    //* counter-h1-up.js h1/
    function counterUp() {
        if ($('.funfact-text').length) { 
            $('.counter').counterUp({
                delay: 10,
                time: 1500, 
            });
        };
    };
    // home-ONE-page-banner-area h1/
    $('.banner-area').owlCarousel({
        loop:true,
        margin:0,
        items: 1,
        autoplayTimeout: 7000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 800,
        nav:true,
        autoplay:true,
        navText : ['<i class="fal fa-chevron-left"></i>','<i class="fal fa-chevron-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    }) 
    
    /*owl carousel  *courses h1*/
    $('.courses-images').owlCarousel({
        loop:true,
        margin:24,
        responsiveClass:true,
        items:3,
        autoplay:true,
        autoplayTimeout:5000,
        smartSpeed: 800,
        nav: true,
        navText : ['<i class="fal fa-chevron-left"></i>','<i class="fal fa-chevron-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    })
    /*owl carousel *testimunila h1*/
    $('.testimonial-mamber').owlCarousel({
        loop:true,
        margin:0,
        responsiveClass:true,
        items:1,
        autoplay:true,
        autoplayTimeout:5000,
        smartSpeed: 800,
        nav: true,
        navText : ['<i class="fal fa-chevron-left"></i>','<i class="fal fa-chevron-right"></i>']
    })
    /*owl carousel *cleint*/
    $('.cleint-office-logo').owlCarousel({
        loop:true,
        margin:90,
        responsiveClass:true,
        items:5,
        autoplay:true,
        autoplayTimeout:8000,
        animateOut: 'fadeOut',
        smartSpeed: 1100,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:2
            },
            300:{
                items:2
            },
            600:{
                items:3
            },
            900:{
                items:4
            },
            1000:{
                items:5
            }
        }
    })
    /*owl carousel *testimunila-h2*/
    $('.client-id').owlCarousel({
        loop:true,
        margin:0,
        responsiveClass:true,
        items:2,
        autoplay:true,
        autoplayTimeout:5000,
        smartSpeed: 800,
        nav: true,
        navText : ['<i class="fal fa-chevron-left"></i>','<i class="fal fa-chevron-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:2
            }
        }
    })
    // Scroll to top
    function scrollToTop() {
        if ($('.footer-button').length) {  
            $(window).on('scroll', function () {
                if ($(this).scrollTop() > 100) {
                    $('.footer-button').fadeIn();
                } else {
                    $('.footer-button').fadeOut();
                }
            }); 
            //Click event to scroll to top
            $('.footer-button').on('click', function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 100);
                return false;
            });
        }
    }
    //* Magnificpopup js
    function magnificPopup() {
        if ($('.popup-youtube').length) { 
            //Video Popup
            $('.popup-youtube').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false, 
                fixedContentPos: false,
            });   
        };
    };
    // Menu Search from 
    $(".js-search-dropdown-toggle").on("click", function () {
        $(".mnmd-search-full").toggleClass("On");
    });
    $("#mnmd-search-remove").on("click", function () {
        $(".mnmd-search-full").removeClass("On");
    });

    // Preloader JS
    function preloader(){
        if( $('.preloader').length ){
            $(window).on('load', function() {
                $('.preloader').fadeOut();
                $('.preloader').delay(50).fadeOut('slow');  
            })   
        }
    }

    //* Countdown
    function countDown() {
        if ($('.countdown-area').length) {
            $('.countdown').countdown('2021/12/31', function(event) {
                var $this = $(this).html(event.strftime('' 
                + '<div class="items"><span>%d</span> Days</div>'
                + '<div class="items"><span>%H</span> Hours</div>'
                + '<div class="items"><span>%M</span> Minutes</div>'
                + '<div class="items"><span>%S</span> Seconds</div>'));
            });
        };
    };

    //*  Simple LightBox js 
    function LightBox(){
    if( $('.img-zoom').length){
        $('.img-zoom').simpleLightbox()
     }
    }

    /*Function Calls*/ 
    new WOW().init(); 
    counterUp();  
    scrollToTop();
    navbarFixed ();
    magnificPopup()
    LightBox();
    preloader ();
    countDown();
    
})(jQuery); 


