$(document).ready(function() {
    var items = $('#items');
    items.owlCarousel({
        loop: false,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 3000,
        dots: false,
        nav: false,
        items: 5
        // responsive: {
        //     0: {
        //         items: 1
        //     },
        //     600: {
        //         items: 3
        //     },
        //     1000: {
        //         items: 5
        //     }
        // }
    });
// Go to the next item
    $('#next_i').click(function() {
        items.trigger('next.owl.carousel');
    });
// Go to the previous item
    $('#prev_i').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        items.trigger('prev.owl.carousel');
    });
    items.on('mousewheel', '.owl-stage', function (e) {
        // $('.section_header').text(e.deltaX);
        if (e.deltaX>0) {
            e.preventDefault();
            items.trigger('next.owl');
        }
        if (e.deltaX<0) {
            e.preventDefault();
            items.trigger('prev.owl');
        }
    });
});