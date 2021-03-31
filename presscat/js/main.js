$(function(){
    var swiper = new Swiper('.swiper-container', {
        effect: 'fade',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    $(".swiper-pagination > span:nth-child(1)").text("1. Value");
    $(".swiper-pagination > span:nth-child(2)").text("2. Experience");
    $(".swiper-pagination > span:nth-child(3)").text("3. Awards");

    scrollEvent();
    $(window).on("scroll", scrollEvent);

    $("a[href='#']").click(function(e){
        e.preventDefault();
    });

    // resize시 탭메뉴 닫기
    $(window).resize(function(){
        if($("#mobile").hasClass("active")) {
            $(".tab_close").trigger("click");
        }
    });

    // fix top
    $(".fix_top").click(function(){
        $("html, body").animate( { scrollTop : 0 }, 1000, "swing");
    });

    // fix_top scroll event
    $(window).scroll(function(){
         if($(window).scrollTop() <= 500) {
            $(".fix_top").removeClass("active");
        } else {
            if(!$(".fix_top").hasClass("active")){
                $(".fix_top").addClass("active");
            }
        }
        if($(window).scrollTop() >= 70) {
            $("#header").addClass("fixed");
        } else {
            if($("#header").hasClass("fixed")){
                $("#header").removeClass("fixed");
            }
        }
    });

    // tab 클릭 이벤트
    $(".tab").click(function(){
        $("html").addClass("fixed");
        $(".dim").fadeIn(300);
        $(".dim").addClass("active");
        $("#mobile").addClass("active");
    });
    $(".dim, .tab_close").click(function(){
        $("html").removeClass("fixed");
        $(".dim").fadeOut(300);
        $(".dim").removeClass("active");
        $("#mobile").removeClass("active");
    });

    //nav 클릭 이벤트
    $("#desktop > ul > li, #mobile > ul > li").click(function(){
        //nav id
        var id = $(this).parent().parent()[0].id;
        var contents = $("#section > .section_inner > div");
        var index = $(this).index() == 5 ? $(this).index() + 1 : $(this).index();
        var defaultTop = 70;

        if(index == 1 || index == 3) {
            defaultTop = 120;
        } else if (index == 6) {
            defaultTop = 65;
        }

        if(id == "mobile") {
            $(".tab_close").trigger("click");
            // 모바일 상단 라인 맞춰주기
            if(index == 1) {
                defaultTop = 110;
            }
        }

        var scrollTop = contents.eq(index).offset().top - defaultTop;
        $("html, body").animate( { scrollTop : scrollTop }, 1000, "swing");
    });

    function scrollEvent() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var contents = $("#section > .section_inner > div");
        // scroll 이벤트 모두 보여주면 off
        if(contents.last().hasClass("view")){
            $(window).off("scroll", scrollEvent);
        }
        for(var i = 0; i < contents.length; i++){
            var offsetTop = contents.eq(i).offset().top;
            var elementHeight = contents.eq(i).height();
            var defaultTop = 200;
            if((scrollTop + windowHeight >= offsetTop + defaultTop)
                && !contents.eq(i).hasClass("view")) {
                contents.eq(i).addClass("view");
            }
        }
    }
});