$(document).ready(function() {
    var photos = $('#photos');
    photos.owlCarousel({
        loop: false,
        autoplay: false,
        dots: true,
        // nav: true,
        items: 1
    });
    //Go to the next item
    $('#next_p').click(function() {
        photos.trigger('next.owl.carousel');
    });
    // Go to the previous item
    $('#prev_p').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        photos.trigger('prev.owl.carousel');
    });
    photos.magnificPopup({
        delegate: 'a',
        type: 'image',
        // tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            verticalFit: false,
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            // titleSrc: function(item) {
            //     return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            // }
        }
    });
});