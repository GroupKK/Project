var loading = false;

$(document).ready(function () {
    //load brands
    $.ajax({
        type: 'GET',
        url: '/Bootstrap/json/top_brands.json',
        data: { get_param: 'value' },
        dataType: 'json',
        success: function (data) {
            $.each(data, function(index, element) {
                $('#brand_filter .options').append('<div class=\"option\">\n' +
                    '                                    <div class=\"checkbox\"></div>\n' +
                    '                                    <input type=\"checkbox\" name=\"' + element.name +'\">\n' +
                    '                                    <label>' + element.name.toString() + '</label>\n' +
                    '                                </div>');
                if (index > 38)
                    return false;
            });
            //tick checkboxes
            $('#brand_filter .options').children('.option').on('click', function () {
                if ($(this).children('.checkbox').hasClass('checked')) { //uncheck
                    $(this).children('.checkbox').removeClass('checked');
                    $(this).children('input[type="checkbox"]').removeAttr('checked');
                }
                else { //check
                    $(this).children('.checkbox').addClass('checked');
                    $(this).children('input[type="checkbox"]').attr('checked', true);
                }
            });
        }
    });
    //add size
    var path = $('#path').text().toString();
    if (path.includes('Одежда') || path.includes('Верхняя одежда')) {
        $('#size_filter .options').append('<div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="xxs">\n' +
            '                                    <label>XXS</label>\n' +
            '                                </div>\n' +
            '                                <div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="xs">\n' +
            '                                    <label>XS</label>\n' +
            '                                </div>\n' +
            '                                <div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="s">\n' +
            '                                    <label>S</label>\n' +
            '                                </div>\n' +
            '                                <div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="m">\n' +
            '                                    <label>M</label>\n' +
            '                                </div>\n' +
            '                                <div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="l">\n' +
            '                                    <label>L</label>\n' +
            '                                </div>\n' +
            '                                <div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="xl">\n' +
            '                                    <label>XL</label>\n' +
            '                                </div>\n' +
            '                                <div class="option">\n' +
            '                                    <div class="checkbox"></div>\n' +
            '                                    <input type="checkbox" name="xxl">\n' +
            '                                    <label>XXL</label>\n' +
            '                                </div>\n');
    }
    else if (path.includes('Женское') && path.includes('Обувь')) {
        for(var i = 33; i < 43; i++) {
            $('#size_filter .options').append('<div class="option">\n' +
                '                                    <div class="checkbox"></div>\n' +
                '                                    <input type="checkbox" name=\"' + i +'\">\n' +
                '                                    <label>' + i + '</label>\n' +
                '                                </div>\n');
        }
    }
    else if (path.includes('Мужское') && path.includes('Обувь')) {
        for(var i = 40; i < 47; i++) {
            $('#size_filter .options').append('<div class="option">\n' +
                '                                    <div class="checkbox"></div>\n' +
                '                                    <input type="checkbox" name=\"' + i +'\">\n' +
                '                                    <label>' + i + '</label>\n' +
                '                                </div>\n');
        }
    }
    else {
        $('#size_filter').addClass('hidden');
    }
    //tick checkboxes
    $('.option').on('click', function () {
        if ($(this).children('.checkbox').hasClass('checked')) { //uncheck
            $(this).children('.checkbox').removeClass('checked');
            $(this).children('input[type="checkbox"]').removeAttr('checked');
            submitFilters();
        }
        else { //check
            $(this).children('.checkbox').addClass('checked');
            $(this).children('input[type="checkbox"]').attr('checked', true);
            submitFilters();
        }
    });
    //TODO: add vertical nav button to the user_page
    $(window).scroll(function() {
        //toggle scroll to top button
        if ($(window).scrollTop() > 950)
        {
            if ($('.vertical_nav').hasClass('hidden'))
                $('.vertical_nav').removeClass('hidden');
        }
         else {
            if (!$('.vertical_nav').hasClass('hidden'))
                $('.vertical_nav').addClass('hidden');
        }
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
    $('.vertical_nav').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    })
});

function submitFilters() {
    //TODO: rewrite ajax query responses
    var tmp = $('#ads').html();
    $('#ads').html('');
    $.ajax({
        type: "POST",
        url: 'path/to/your/script',
        data: $('#filters').serialize(), // serializes the form's elements
        success: function(data)
        {
            $('#ads').css('opacity', 1).html(data);
        },
        error: function () {
            setTimeout(function () {
                $('#ads').css('opacity', 1);
            }, 1000);
            $('#ads').html('<div class=\"title empty\">Нет объявлений</div>');
        }
    });

}