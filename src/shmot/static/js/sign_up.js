Dropzone.autoDiscover = false;

$(document).ready(function () {
    var city;
    var xhr;

    city = $('#city').selectize({
        create: true,
        valueField: 'name',
        labelField: 'name',
        searchField: ['name']
    })[0].selectize;

    city.load(function(callback) {
        xhr && xhr.abort();
        xhr = $.ajax({
            url: '/static/json/cities.json',
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
    
        var dropzone = new Dropzone(".main_form", {
        url: "signup_submit/",
        paramName: "avatar", // The name that will be used to transfer the file
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 1,
        addRemoveLinks: true,
        acceptedFiles: "image/jpeg,image/png,image/jpg",
        init: function() {
            this.on("maxfilesexceeded", function() {
                if (this.files[1]!=null){
                    this.removeFile(this.files[1]);
                }
            });
        }
    });

    
    $('.dz-message span').text('Добавить аватар');
    //add current avatar (when user edits his profile)
    if (document.getElementById('current_avatar_url'))
    {
        var existingFiles = [
            { name: "images/cat_banner_1.png", size: 12345678 }
        ];
        dropzone.emit("addedfile", existingFiles[0]);
        dropzone.emit("thumbnail", existingFiles[0], $('#current_avatar_url').text());
        dropzone.emit("complete", existingFiles[0]);
        $('.dz-image img').css({'width': '120px','height':'120px','object-fit':'cover'});
    }
    $('#phone').focus(function () {
        $(this).attr('placeholder', '+7 (___) ___-__-__');
    });
    // var phone = '';
    $('#phone').on('keypress', function (event) {
        if (!(String.fromCharCode(event.keyCode) >= '0' && String.fromCharCode(event.keyCode) <= '9'))
            return false;
        // phone += event.key;
        $(this).val(addTemplate($(this).val().toString() + event.key));
        return false;
        // alert('keypress' + $(this).val());
        // alert(addTemplate($(this).val().toString() + event.key));
    });
    $('#phone').on('keyup', function (event) {
        // alert('keyup' + $(this).val());
        $(this).val(addTemplate($(this).val().toString()));
    });
    $('#phone').on('keydown', function (event) {
        if ($(this).val()=='')
            $(this).val('+7 (');
        var keyCode = event.keyCode;
        if ((keyCode == 8 || keyCode == 46 || keyCode == 37) && caretPosition(document.getElementById('phone')) <= 4 || caretPosition(document.getElementById('phone')) < 4 && keyCode != 39)
        {
            // $(this).val('');
            $(this).val($(this).val());
            return false;
        }
    })
});

function addTemplate(s) {
    var t = '';
    s = s.substr(4, s.length - 4);
    s = s.replace('-','');
    s = s.replace('-','');
    s = s.replace(')','');
    s = s.replace(' ','');
    // alert(s + ' ' + s.length);
    if (s.length <= 3)
        return '+7 (' + s;
    if (s.length > 3 && s.length <= 6)
        t = '+7 (' + s.substr(0,3)+') ' + s.substr(3, s.length - 3);
    if (s.length > 6 && s.length <= 8)
        t = '+7 (' + s.substr(0,3)+') ' + s.substr(3, 3) + '-' + s.substr(6, s.length - 6);
    if (s.length > 8)
        t = '+7 (' + s.substr(0,3)+') ' + s.substr(3, 3) + '-' + s.substr(6, 2) + '-' + s.substr(8, 2);
    return t;
}

function caretPosition (el) {
    var val = el.value;
    return val.slice(0, el.selectionStart).length;
}

function check() {
    var flag = true;
    $('select.required, input.required').each(function () {
        if ($(this).val() == '') {
            $(this).parent().addClass('set_focus');
            $(this).parent().children('.icon').attr('data-balloon-visible', true);
            $('html, body').animate({
                scrollTop: $(this).offset().top - 100
            }, 500);
            $(this).focus();
            setTimeout(function (o) {
                o.parent().removeClass('set_focus');
                o.parent().children('.icon').removeAttr('data-balloon-visible');
            }, 3000, $(this));
            flag = false;
            return false;
        }
    });
    if (flag && $('#password').val().toString().length < 6) {
        $('#password').val('');
        $('#password').parent().addClass('set_focus');
        $('#password').parent().children('.icon').addClass('hovered');
        setTimeout(function () {
            $('#password').parent().removeClass('set_focus');
            $('#password').parent().children('.icon').removeClass('hovered');
        }, 5000);
        flag = false;
    }
    if (flag && $('#password').val() != $('#password_repeat').val()) {
        $('#password_repeat').val('');
        $('#password_repeat').parent().addClass('set_focus');
        $('#password_repeat').parent().children('.icon').addClass('hovered');
        setTimeout(function () {
            $('#password_repeat').parent().removeClass('set_focus');
            $('#password_repeat').parent().children('.icon').removeClass('hovered');
        }, 5000);
        flag = false;
    }
    if (flag)
    {
        var myDropzone = Dropzone.forElement(".main_form");
        myDropzone.processQueue();
        $('#submit').click();
    }
};
