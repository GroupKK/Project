var loading = false;

$(document).ready(function() {
    var items = $('.owl-carousel');
    items.owlCarousel({
        loop: false,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 3000,
        dots: false,
        nav: false,
        items: 3
    });

    //add listeners to the buttons
    items.each(function (index) {
        $(this).prev().click(function() {
            $(this).next().trigger('prev.owl.carousel');
        });
        $(this).next().click(function() {
            $(this).prev().trigger('next.owl.carousel');
        });
        $(this).on('mousewheel', '.owl-stage', function (e) {
            // $('.section_header').text(e.deltaX);
            // console.log(e.deltaX*e.deltaFactor);
            if (e.deltaX>0) {
                e.preventDefault();
                $(this).trigger('next.owl.carousel');
            }
            if (e.deltaX<0) {
                e.preventDefault();
                $(this).trigger('prev.owl.carousel');
            }
        });
    });

    $(window).scroll(function () {
        //load more ads when user reaches the bottom
        //TODO: add ajax query
        if (!($('#adds_view').hasClass('hidden')))
        {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 400 && !loading) {
                loading = true;
                $('.spinner').removeClass('hidden');
                setTimeout(function () {
                    $('.spinner').addClass('hidden');
                    $('#adds_view').append($('#adds_view').html());
                    loading = false;
                }, 2000);
            }
        }
    });
});

function toggleView() {
    $('#users').toggleClass('active');
    $('#users_view').toggleClass('hidden');
    $('#adds').toggleClass('active');
    $('#adds_view').toggleClass('hidden');
}