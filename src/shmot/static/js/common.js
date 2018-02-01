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