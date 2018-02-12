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
    //handle subscribe
    $('.subscribe_btn').on('click', function () {
        if ($(this).hasClass('subscribed'))
        { //unsubscribe
            $(this).text('Подписаться').removeClass('subscribed');
        }
        else { //subscribe
            $(this).text('Вы подписаны').addClass('subscribed');
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
    $('.likes').on('click', function () {
        if ($(this).hasClass('liked')) { //dislike
            $(this).removeClass('liked');
            $(this).children('a').text(parseInt($(this).children('a').text())-1);
        }
        else { //like
            $(this).addClass('liked');
            $(this).children('a').text(parseInt($(this).children('a').text())+1);
        }
    });
    //handle adding to favourites
    $('.fav').on('click', function () {
        if ($(this).hasClass('starred')) { //remove from favourites
            $(this).removeClass('starred');
        }
        else { //add to favourites
            $(this).addClass('starred');
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
    })
});

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


// function likeItem(likes) {
//     var number = likes.getElementsByTagName('a')[0];
//     // number.innerHTML = number.innerHTML++;
//     var unliked = likes.getElementsByTagName('i')[0];
//     var liked = likes.getElementsByTagName('i')[1];
//     if (unliked.style.display == "none") { //unlike
//         unliked.style.display = "inline";
//         liked.style.display = "none";
//         var num = parseInt(number.text);
//         number.text = num-1;
//     } else { //like
//         liked.style.display = "inline";
//         unliked.style.display = "none";
//         var num = parseInt(number.text);
//         number.text = num+1;
//     }
// }

// function favItem(fav) {
//     var unstarred = fav.getElementsByTagName('i')[0];
//     var starred = fav.getElementsByTagName('i')[1];
//     if (unstarred.style.display == "none") { //remove from favorites
//         unstarred.style.display = "inline";
//         starred.style.display = "none";
//     } else { //add to favorites
//         starred.style.display = "inline";
//         unstarred.style.display = "none";
//     }
// }
