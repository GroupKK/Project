Dropzone.autoDiscover = false;

//another way to instantiate dropzone
// Dropzone.options.dropzone = {
//     url: "/file/post",
//     autoProcessQueue: false,
//     uploadMultiple: true,
//     parallelUploads: 4,
//     maxFiles: 4,
//     addRemoveLinks: true
// };

var cat_value;
var subcat_value;
var brand;
var city;
var type;
var sending;
var dropzone;

$(document).ready(function () {
    var xhr;
    var $category;
    var subcategory;

    $('#category').selectize({
        onChange: function(value) {
            if (!value.length) return;
            // type.disable();
            // type.clearOptions();
            disableType();
            disableOthers();
            subcategory.enable();
            subcategory.clear();
            removeAdditional();
            cat_value = value;
        }
    });

    subcategory = $('#subcategory').selectize({
        onChange: function(value) {
            if (!value.length) return;
            subcat_value = value;
            // type.disable();
            // type.clearOptions();
            disableType();
            disableOthers();
            type.load(function(callback) {
                xhr && xhr.abort();
                xhr = $.ajax({
                    url: '/Bootstrap/json/options_' + cat_value +'_' + value +'.json',
                    type: 'GET',
                    dataType: 'json',
                    success: function(results) {
                        // type.enable();
                        enableType();
                        addAdditional();
                        callback(results);
                    },
                    error: function() {
                        callback();
                    }
                })
            });
        }
    })[0].selectize;
    type = $('#type').selectize({
        valueField: 'name',
        labelField: 'name',
        searchField: ['name'],
        onChange: function (value) {
            if (!value.length) return;
            enableAdditional();
            enableOthers();
        }
    })[0].selectize;
    brand = $('#brand').selectize({
        valueField: 'name',
        labelField: 'name',
        searchField: ['name']
    })[0].selectize;

    city = $('#city').selectize({
        valueField: 'name',
        labelField: 'name',
        searchField: ['name']
    })[0].selectize;
    sending = $('#sending').selectize()[0].selectize;

    dropzone = new Dropzone(".main_form", {
        url: "/file/post",
        paramName: "photo", // The name that will be used to transfer the file
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 4,
        maxFiles: 4,
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png,image/jpg",
        init: function() {
            this.on("maxfilesexceeded", function() {
                if (this.files.length > 4){
                    for (var i = 4; i < this.files.length; i++)
                        this.removeFile(this.files[i]);
                }
            });
        }
    });

    subcategory.disable();
    // type.disable();
    disableType();
    disableOthers();

    brand.load(function f(callback) {
        xhr && xhr.abort();
        xhr = $.ajax({
            url: '/Bootstrap/json/brands.json',
            type: 'GET',
            dataType: 'json',
            success: function(results) {
                callback(results);
            },
            error: function() {
                callback();
                alert('error');
            }
        })
    });

    var xht;
    city.load(function(callback) {
        xht && xht.abort();
        xht = $.ajax({
            url: '/Bootstrap/json/cities.json',
            type: 'GET',
            dataType: 'json',
            success: function(results) {
                callback(results);
            },
            error: function() {
                callback();
            }
        })
    });

    $('#price').on('keypress', function (event) {
        if (!(String.fromCharCode(event.keyCode) >= '0' && String.fromCharCode(event.keyCode) <= '9'))
            return false;
    });
});

function disableOthers() {
    $('#other_fields input,textarea').prop('disabled', true);
    $('#other_fields button').prop('disabled', true);
    city.disable();
    sending.disable();
    dropzone.disable();
    $('#other_fields input:disabled, textarea:disabled, #other_fields .disabled').css('opacity',1);
    $('#other_fields').addClass('faded');
}

function enableOthers() {
    $('#other_fields input,textarea').prop('disabled', false);
    $('#other_fields button').prop('disabled', false);
    city.enable();
    sending.enable();
    dropzone.enable();
    // $('#other_fields *:disabled, #other_fields .disabled').css('opacity',1);
    $('#other_fields').removeClass('faded');
}

function disableType() {
    // $('#type').parent().addClass('faded');
    // $('#type').parent().children('.disabled').css('opacity',1);
    type.disable();
    type.clearOptions();
    $('#type').siblings().not('.selectize-control').addClass('faded');
}

function enableType() {
    type.enable();
    $('#type').siblings().not('.selectize-control').removeClass('faded');
}

// function numberInput(input) {
//     $('#price').val(function (input, value) {
//         return value.toString().replace(/[^0-9]/g, "");
//     })
// }

var additional_fields = [];

function enableAdditional() {
    brand.enable();
    additional_fields.forEach(function (t) { t.enable(); });
    $('#additional p').removeClass('faded');
    $('#brand').siblings().not('.selectize-control').removeClass('faded');
}

function addAdditional() {
    brand.disable();
    brand.setValue("Не выбрано", false);
    $('#brand_wrap').removeClass('hidden');
    document.getElementById('additional').innerHTML = '';
    if (subcat_value == "clothing" || subcat_value=="outer_clothing")
    {
        document.getElementById('additional').innerHTML = "<div class=\"center\">" +
            "                        <p>Размер</p>" +
            "                        <select class=\"additional\" name=\"size\">" +
            "                            <option selected>Не выбрано</option>" +
            "                            <option value=\"xxs\">XXS</option>" +
            "                            <option value=\"xs\">XS</option>" +
            "                            <option value=\"s\">S</option>" +
            "                            <option value=\"m\">M</option>" +
            "                            <option value=\"l\">L</option>" +
            "                            <option value=\"xl\">XL</option>" +
            "                            <option value=\"xxl\">XXL</option>" +
            "                        </select>" +
            "                    </div>";
    }
    else if (subcat_value == "footwear")
    {
        if (cat_value == "women")
        {
            document.getElementById('additional').innerHTML = "<div class=\"center\">" +
                "                        <p>Размер</p>" +
                "                        <select class=\"additional\" name=\"size\">" +
                "                            <option selected>Не выбрано</option>" +
                "                            <option>33</option>" +
                "                            <option>34</option>" +
                "                            <option>35</option>" +
                "                            <option>36</option>" +
                "                            <option>37</option>" +
                "                            <option>38</option>" +
                "                            <option>39</option>" +
                "                            <option>40</option>" +
                "                            <option>41</option>" +
                "                            <option>42 и больше</option>" +
                "                        </select>" +
                "                    </div>";
        }
        else {
            document.getElementById('additional').innerHTML = "<div class=\"center\">" +
                "                        <p>Размер</p>" +
                "                        <select class=\"additional\" name=\"size\">" +
                "                            <option selected>Не выбрано</option>" +
                "                            <option>40</option>" +
                "                            <option>41</option>" +
                "                            <option>42</option>" +
                "                            <option>43</option>" +
                "                            <option>44</option>" +
                "                            <option>45</option>" +
                "                            <option>46 и больше</option>" +
                "                        </select>" +
                "                    </div>";
        }
    }
    document.getElementById('additional').innerHTML += "<div class=\"center\">" +
        "                        <p>Цвет</p>" +
        "                        <select class=\"additional\" name=\"color\">" +
        "                            <option selected>Не выбрано</option>" +
        "                            <option value=\"Черный\">Черный</option>" +
        "                            <option value=\"Серый\">Серый</option>" +
        "                            <option value=\"Белый\">Белый</option>" +
        "                            <option value=\"Бежевый\">Бежевый</option>" +
        "                            <option value=\"Оранжевый\">Оранжевый</option>" +
        "                            <option value=\"Хаки\">Хаки</option>" +
        "                            <option value=\"Зеленый\">Зеленый</option>" +
        "                            <option value=\"Голубой\">Голубой</option>" +
        "                            <option value=\"Синий\">Синий</option>" +
        "                            <option value=\"Фиолетовый\">Фиолетовый</option>" +
        "                            <option value=\"Розовый\">Розовый</option>" +
        "                            <option value=\"Красный\">Красный</option>" +
        "                            <option value=\"Бордовый\">Бордовый</option>" +
        "                            <option value=\"Коричневый\">Коричневый</option>" +
        "                            <option value=\"Разноцветный\">Разноцветный</option>" +
        "                        </select>" +
        "                    </div>";
    $('#additional select').selectize().each(function () {
        $(this)[0].selectize.disable();
        additional_fields.push($(this)[0].selectize);
    });
    //resize
    $('#form_wrap').removeClass('three_additional_fields two_additional_fields no_fields');
    if (subcat_value == "accessories") {
        $('#form_wrap').addClass('two_additional_fields');
    }
    else {
        $('#form_wrap').addClass('three_additional_fields');
    }
    //make fields a bit transparent
    $('#additional p').addClass('faded');
    $('#brand').siblings().not('.selectize-control').addClass('faded');
}

function removeAdditional() {
    brand.disable();
    brand.setValue("Не выбрано", false);
    $('#brand_wrap').addClass('hidden');
    document.getElementById('additional').innerHTML = '';
    $('#form_wrap').removeClass('three_additional_fields two_additional_fields').addClass('no_fields');
    additional_fields = [];
}

function check() {
    var flag = true;
    $('select.required, input.required').each(function () {
        if ($(this).val() == '') {
            $(this).parent().addClass('set_focus');
            $(this).parent().children('.icon').attr('data-balloon-visible', true);
            if ($(this).prop('tagName') == 'SELECT')
            {
                $('html, body').animate({
                    scrollTop: $(this).next().offset().top - 100
                }, 500);
            }
            else {
                $('html, body').animate({
                    scrollTop: $(this).offset().top - 100
                }, 500);
                $(this).focus();
            }
            setTimeout(function (o) {
                o.parent().removeClass('set_focus');
                o.parent().children('.icon').removeAttr('data-balloon-visible');
            }, 3000, $(this));
            flag = false;
            return false;
        }
    });
    // if (parseInt($('#price').val()) < 0) {
    //     $('#price').parent().addClass('set_focus');
    //     $('#price').parent().children('.icon').addClass('hovered');
    //     $('#price').val('');
    //     $('html, body').animate({
    //         scrollTop: $('#price').offset().top - 100
    //     }, 500);
    //     $('#price').focus();
    //     setTimeout(function (o) {
    //         o.parent().removeClass('#price');
    //         o.parent().children('.icon').removeClass('hovered');
    //     }, 5000, $('#price'));
    //     flag = false;
    // }
    if (flag && dropzone.getQueuedFiles().length == 0) {
        $('.dropzone, #drop').addClass('hovered');
        $('#drop').addClass('set_focus');
        setTimeout(function () {
            $('.dropzone, #drop').removeClass('hovered');
            $('#drop').removeClass('set_focus');
        }, 5000);
        flag = false;
    }
    if (flag)
    {
        $('#submit').click();
    }
}