$(document).ready(function() {
    $('[href=\'#sign_in_popup\']').magnificPopup({
        type: 'inline',
        showCloseBtn: false
        // focus: '#name',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        // callbacks: {
        //     beforeOpen: function() {
        //         if($(window).width() < 700) {
        //             this.st.focus = false;
        //         } else {
        //             this.st.focus = '#name';
        //         }
        //     }
        // }
    });
    pulse($('.add_button'));

    var last_sub;
    //handle subscribe
    $('.subscribe_btn').on('click', function () {
        if ($('body').hasClass('signed_in')) {
            toggleSub($(this));
            last_sub = $(this);
            $.ajax({
                type: "POST",
                data: $('#fake_form').serialize(),
                url: '/subscribe/' + $('body').attr('id') + '/' + $('.profile').first().attr('id') + '/',
                success: function(data)
                {
                },
                error: function ()
                {
                    // toggleSub(last_sub);
                }
            });
        }
        else {
            $('#hidden_sign_in_popup').click();
        }
    });
    $('.subscribe_btn').hover(function () {
        if ($(this).hasClass('subscribed'))
        {
            $(this).text('Отписаться');
        }
    }, function () {
        if ($(this).hasClass('subscribed'))
        {
            $(this).text('Вы подписаны');
        }
    });
    //handle likes
    var last_liked;
    $('.likes').on('click', function () {
        if ($('body').hasClass('signed_in')) {
            toggleLikes($(this));
            last_liked = $(this);
            $.ajax({
                type: "POST",
                data: $('#fake_form').serialize(), // serializes the form's elements
                url: '/like_post/' + $('body').attr('id') + '/' + $(this).parent('.ceiling').children('.add_id').first().attr('id') + '/',
                success: function(data)
                {
                },
                error: function ()
                {
                    // toggleLikes(last_liked);
                }
            });
        }
        else {
            $('#hidden_sign_in_popup').click();
        }
    });
    var last_fav;
    //handle adding to favourites
    $('.fav').on('click', function () {
        if ($('body').hasClass('signed_in'))
        {
            toggleFav($(this));
            last_fav = $(this);
            $.ajax({
                type: "POST",
                data: $('#fake_form').serialize(),
                url: '/add_to_fav/' + $('body').attr('id') + '/' + $(this).parent('.ceiling').children('.add_id').first().attr('id') + '/',
                success: function(data)
                {
                },
                error: function ()
                {
                    // toggleFav(last_fav);
                }
            });
        }
        else
        {
            $('#hidden_sign_in_popup').click();
        }
    });
    //load brands
    $.ajax({
        type: 'GET',
        url: '/static/json/top_brands.json',
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                var i = Math.floor(index / 12 + 1);
                //TODO: add links in href attribute
                $('.brands_list .sub_column:nth-child(' + i + ') ul').append('<li><a href=\"\">' +
                    element.name + '</a></li>');
                if (index > 45)
                    return false;
            });
            $('.brands_list .sub_column:last-child').append('<li><a href="" style="font-weight: normal;">\n' +
                '                                        Все бренды\n' +
                '                                        <i class="fa fa-angle-right" aria-hidden="true"></i>\n' +
                '                                    </a></li>');
        },
        error: function () {
            $('.brands_list .sub_column:first-child').append('<li><a href="" style="font-weight: normal;">\n' +
                '                                        Все бренды\n' +
                '                                        <i class="fa fa-angle-right" aria-hidden="true"></i>\n' +
                '                                    </a></li>');
        }
    });
    $('.copy').on('click', function () {
        copyToClipboard($(this).prev());
        $(this).attr('data-balloon', 'Скопировано');
        setTimeout(function (e) {
            e.attr('data-balloon', 'Копировать');
        }, 2000, $(this));
    });
    $('.item_description').each(function () {
        $(this).attr('title', $(this).text());
        if ($(this).text().length >= 10)
            $(this).text($(this).text().substr(0,10)+'...');
    });
    $('header .search_btn').on('click',function (e) {
        if ($('.wrap').width() == 1024)
            return;
        else
        {
            e.preventDefault();
            if ($(this).prev().hasClass('hidden'))
            {
                $(this).prev().removeClass('hidden');
                setTimeout(function (o) {
                    o.prev().children('input').focus();
                }, 300, $(this));
            }
            else
            {
                if ($(this).prev().children('input').val() != "")
                    $(this).prev().submit();
                else
                    $(this).prev().children('input').focus();
            }
        }
    });
    $('header .clear_btn').on('click', function () {
        $(this).parent().addClass('hidden');
        $(this).next().val("");
    });
});

function toggleLikes(element) {
    if (element.hasClass('liked')) { //dislike
        element.removeClass('liked');
        element.children('a').text(parseInt(element.children('a').text())-1);
    }
    else { //like
        element.addClass('liked');
        element.children('a').text(parseInt(element.children('a').text())+1);
    }
}

function toggleFav(element) {
    if (element.hasClass('starred')) { //remove from favourites
        element.removeClass('starred');
        element.attr('data-balloon','Добавить в избранное');
    }
    else { //add to favourites
        element.addClass('starred');
        element.attr('data-balloon','Удалить из избранного');
    }
}

function toggleSub(element) {
    if (element.hasClass('subscribed'))
    { //unsubscribe
        element.text('Подписаться').removeClass('subscribed');
    }
    else { //subscribe
        element.text('Вы подписаны').addClass('subscribed');
    }
}

function check_sign_in() {
    var flag = true;
    $('#sign_in_form input').each(function () {
        if ($(this).val() == '') {
            $(this).addClass('set_focus');
            $(this).focus();
            setTimeout(function (o) {
                o.removeClass('set_focus');
            }, 5000, $(this));
            flag = false;
            return false;
        }
    });
    if (flag)
    {
        $('#sign_in_form #sign_in').click();
    }
};

function pulse(o) {
    o.addClass('pulse-button');
    setTimeout(function () {
        o.removeClass('pulse-button');
    }, 2000);
    setTimeout(function () {
        pulse(o)
    }, 10000);
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    var val = '';
    //if it's a link tag copy the very link
    if (element.prop('tagName')=='A') {
        val = element.attr('href');
    }
    else
        val = element.text();
    $temp.val(val).select();
    document.execCommand("copy");
    $temp.remove();
}