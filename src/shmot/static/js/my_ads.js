var loading = false;
var caller = null;

$(document).ready(function() {
    $('[href=\'#confirm_popup\']').magnificPopup({
        type: 'inline',
        showCloseBtn: false,
        closeOnContentClick: true
    });

    $('.add_item').hover(function (e) {
        e.preventDefault();
    });

    $('[href=\'#confirm_popup\']').on('click',function () {
        caller = $(this);
    });
    
    $('#confirm_btn').on('click', function () {
        if (caller.text().trim()=="Удалить")
        {
            // $.magnificPopup.close();
            caller.parents('.add_item').addClass('deleted');
            caller.parents('.add_item').children('a').removeAttr('href');
        }
        else {
            caller.parents('.add_item').addClass('sold');
            caller.parents('.add_item').children('.sold_marker').removeClass('hidden');
        }
        $.ajax({
            type: "POST",
            url: caller.attr('actual-link'),
            // success: function(data)
            // {
            // },
            // error: function () {
            // }
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
    $('#relevant').toggleClass('active');
    $('#relevant_items').toggleClass('hidden');
    $('#sold').toggleClass('active');
    $('#sold_items').toggleClass('hidden');
}