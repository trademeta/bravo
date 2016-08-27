var $request = $('.request'),
    $sended = $('.sendMess'),
    w = $(window).width(),
    nav = $('.header .navigation');

//============ menu ============
if(w<990){
    var menu = $('.mobile-menu'),
        ul = $('.header ul'),
        overlay = $('.overlay');
    menu.on('click', function(e){
        overlay.fadeIn(500);
        ul.fadeIn(500);
        overlay.on('click', function(e){
            ul.fadeOut(500);
            overlay.fadeOut(500);
        });
    });
}

nav.find('a').on('click', function () {
    var $el = $(this),
        id = $el.attr('href'),
        scrol=$(id).offset().top;
    $('html, body').stop().animate({
        scrollTop: scrol
    }, {
        duration: 1000
    });
    return false;
});

//============ send mess ============
$request.find(':submit').on('click', function(e){
    e.preventDefault();
    var h = $request.outerHeight();
    $request.fadeOut(500,function () {
        $sended.css('height',h+'px').fadeIn(500);
        setTimeout(function () {
            $sended.fadeOut(500,function () {
                $request.fadeIn(500);
            });
        },4000);
    });
});

//============ slider ============
var sliderLeft = $('.slider__left'),
    children = $('.slider__right').flexslider({
    'slideshow': false,
    'controlNav' : false
});
sliderLeft.flexslider({
    pauseOnHover : true,
    animationSpeed: 1000,
    animation: "slide",
    slideshowSpeed: 4000,
    initDelay: 3000,
    before : function(slider){
        children.data('flexslider').flexAnimate(slider.animatingTo);
    }
});

//============ rooms ============
$('svg').click(function(e){
    var $this = $(e.target),
        room = $this.data('room'),
        popup = $('.popup'),
        pref = room['room']==1? '-а': '-х',
        css = {};
    popup.find('.room').html(' '+room['room']+pref+' комнатная');
    popup.find('.art').html(' АРТ.#'+room['art']);
    popup.find('img')[0].src='img/'+room['id']+'.png';
    popup.find('.total span').html(' '+room['total']);
    popup.find('.space span').html(' '+room['space']);
    if(w>1150){
        room['id']<6? css={'right':'37px','left':'inherit'}: css={'left':'37px','right':'inherit'};
    }
    popup.css(css).fadeIn(500);
    $('.close').on('click', function(e){
        popup.fadeOut(500);
    });
});

//============ swipe ============
var swiper = new Swiper('.swiper-container', {
    scrollbar: '.swiper-scrollbar',
    slidesPerView: 'auto',
    grabCursor: true
});

//============ review ============
$('.review :submit').on('click', function(e){
    var sended = $(this).closest('.review').find('.sended');
    sended.fadeIn(500);
    setTimeout(function () {
        sended.fadeOut(500);
    },3000);
});

//section8 slider
$('.section8__slider').flexslider({
    animation: "slide",
    controlNav: "thumbnails"
});

//section10 slider
var slider10 = $('.section10__slider').flexslider({
    animation: "slide",
    animationLoop: false,
    slideshow: false,
    controlNav: false
});

$('.button-zoom').on('click', function(e){
    var imgSrc = slider10.find('.flex-active-slide img')[0].src,
        zoom = slider10.parent().find('.zoom'),
        img = zoom.find('.img');
    img.find('img')[0].src=imgSrc;
    zoom.show();
    setTimeout(function () {
        img.addClass('zoom-in');
    }, 50);
    slider10.parent().find('.close').one('click',function (e) {
        img.removeClass('zoom-in');
        zoom.fadeOut(500);
    })
});

//Google maps api
function initMap() {
    var lat=52.275959,
        lng= 104.358456;
    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 16,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),  mapOptions);

    var image = 'img/marker.png';

    var myLatLng = new google.maps.LatLng(lat, lng);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
        marker.setMap(null);
    });
}
