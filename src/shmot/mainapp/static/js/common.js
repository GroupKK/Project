$(document).ready(function() {
    $('.ad_btn').magnificPopup({
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
});


function likeItem(likes) {
    var number = likes.getElementsByTagName('a')[0];
    number.innerHTML = number.innerHTML++;
    var unliked = likes.getElementsByTagName('i')[0];
    var liked = likes.getElementsByTagName('i')[1];
    if (unliked.style.display == "none") { //unlike
        unliked.style.display = "inline";
        liked.style.display = "none";
        var num = parseInt(number.text);
        number.text = num-1;
    } else { //like
        liked.style.display = "inline";
        unliked.style.display = "none";
        var num = parseInt(number.text);
        number.text = num+1;
    }
    //x.classList.toggle("fa-thumbs-down");
}

function favItem(fav) {
    var unstarred = fav.getElementsByTagName('i')[0];
    var starred = fav.getElementsByTagName('i')[1];
    if (unstarred.style.display == "none") { //remove from favorites
        unstarred.style.display = "inline";
        starred.style.display = "none";
    } else { //add to favorites
        starred.style.display = "inline";
        unstarred.style.display = "none";
    }
}