var loading = false;

$(document).ready(function() {
    $('.content .search_btn').on('click',function (e) {
        if ($(this).prev().val() != "")
            $(this).parent().submit();
        else
            $(this).prev().focus();
    });
    $('.content .clear_btn').on('click', function () {
        $(this).next().val("");
    });
    //adds search key to the search field
    $('#search_key').next().children('input').val($('#search_key').text());

    $(window).scroll(function () {
        //load more ads when user reaches the bottom
        //TODO: add ajax query
        if($(window).scrollTop() + $(window).height() > $(document).height() - 400 && !loading) {
            loading = true;
            $('.spinner').removeClass('hidden');
            setTimeout(function () {
                $('.spinner').addClass('hidden');
                $('#ads').append($('#ads').html());
                loading = false;
            }, 2000);
        }
    });
});