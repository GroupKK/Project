$(document).ready(function() {

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	// $(".fancybox").fancybox();

	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Плавный скролл до блока .div по клику на .scroll
	//Документация: https://github.com/flesler/jquery.scrollTo
	$("a.scroll").click(function() {
		$.scrollTo($(".div"), 800, {
			offset: -90
		});
	});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
    var owl_cat = $('#categories');
    owl_cat.owlCarousel({
        loop: true,
        autoplay: false,
        dots: false,
        nav: false,
        items: 1
    });
    // Go to the next item
    $('#next_c').click(function() {
        owl_cat.trigger('next.owl.carousel');
    })
// Go to the previous item
    $('#prev_c').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl_cat.trigger('prev.owl.carousel');
    })

    var owl_br = $('#brands');
    owl_br.owlCarousel({
        loop: true,
        autoplay: false,
        dots: false,
        nav: false,
        items: 1
    });
    // Go to the next item
    $('#next_b').click(function() {
        owl_br.trigger('next.owl.carousel');
    })
// Go to the previous item
    $('#prev_b').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl_br.trigger('prev.owl.carousel');
    })

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	// $("form").submit(function() {
	// 	$.ajax({
	// 		type: "GET",
	// 		url: "mail.php",
	// 		data: $("form").serialize()
	// 	}).done(function() {
	// 		alert("Спасибо за заявку!");
	// 		setTimeout(function() {
	// 			$.fancybox.close();
	// 		}, 1000);
	// 	});
	// 	return false;
	// });
});
