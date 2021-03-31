$(function(){
    //#region init
    function init(){
        // a href='#' 클릭 무시 스크립트
        $('a[href="#"]').click(function(e) {
            e.preventDefault();
        });
        scrollEvent();
        $(window).on("scroll", scrollEvent);

        redirection();
    }
    //#endregion init

    //#region header animation
    let id; // gnb high_light display: none setTimeOut을 담을 변수
    $("#gnb").mouseover(function(){
        $("#header").addClass("active");
    });
    $("#gnb > ul > li:first-child > a").focusin(function(){
        $("#header").addClass("active");
    });
    $("#gnb li:last-child li:last-child > a").focusout(function(){
        $("#header").removeClass("active");
    });
    $("#header").mouseleave(function(){
        $(this).removeClass("active");
        $("#gnb > ul > li > a").removeClass("active");
        $("#gnb .highlight").css({"opacity" : "0"});
        id = setTimeout(function(){
            $("#gnb .highlight").css({"display" : "none"});
        }, 400);
    });
    $("#header .top .left a").mouseover(function(){
        $("#header").removeClass("active");
    });
    $("#header .top .right a").mouseover(function(){
        $("#header").removeClass("active");
    });
    $("#gnb > ul > li > a").mouseover(function(){
        $("#gnb > ul > li > a").removeClass("active");
        $(this).addClass("active");
    });
    $("#gnb ul ul").mouseover(function(){
        $("#gnb > ul > li > a").removeClass("active");
        $(this).prev().addClass("active");
    });
    let gnb = $("#gnb > ul > li");
    for(var i = 0; i < gnb.length; i++){
        //선택한 gnb메뉴
        let selectGnb = gnb.eq(i);
        //margin-left
        let gnbMentMarginLeft = Number(selectGnb.css("margin-left").replace("px", ""));
        $("#gnb > ul > li:nth-child(" + (i + 1) + ") > a, #gnb > ul > li:nth-child(" + (i + 1) + ") ul").mouseover(function(){
            clearTimeout(id);
            $("#gnb .highlight").css({"left" : (selectGnb.position().left + gnbMentMarginLeft + 16) + "px", 
                                    "width" : (selectGnb[0].clientWidth - 30) + "px",
                                    "display" : "block"});
            setTimeout(function(){
                $("#gnb .highlight").css({"opacity" : "1"});
            }, 1);
        });    
    }
    //#endregion header animation

    //#region site_map animation
    $("#header .left a").click(function(){
        clearTimeout(id);
        $(".site_map_wrap").addClass("active");
        $(".site_map_wrap").css({"display" : "block"});
        id = setTimeout(function(){
            $(".site_map_wrap").css({"opacity" : "1"});
        }, 1);
        $("body").css({"overflow" : "hidden"});
    });
    $(".site_map_wrap .left a").click(function(){
        $(".site_map_wrap").removeClass("active");
        $(".site_map_wrap").css({"opacity" : "0"});
        id = setTimeout(function(){
            $(".site_map_wrap").css({"display" : "none"});
        }, 400);
        $("body").css({"overflow" : "visible"});
    });
    //#endregion site_map animation

    //#region news animation
    let newsTop = Number($("#section .news .list ul").css("top").replace("px", ""));
    let newsIntervalId;

    setInterval(() => {
        newsIntervalId = newsNextAnimation();
    }, 5000);

    $(".news_prev").click(function(){
        clearInterval(newsIntervalId);
        newsIntervalId = newsPrevAnimation();
    });
    
    $(".news_next").click(function(){
        clearInterval(newsIntervalId);
        newsIntervalId = newsNextAnimation();
    });
    //#endregion news animation

    //#region news prev 함수
    function newsPrevAnimation() {
        var newsIntervalId = setInterval(() => {
            $("#section .news .list ul").css({"top" : (newsTop += 1)});
            
            if(newsTop == -52) {
                clearInterval(newsIntervalId);
            } else if(newsTop == 0) {
                clearInterval(newsIntervalId);
                newsTop = -52;
                $("#section .news .list ul").css({"top" : newsTop});
                $("#section .news .list ul").prepend($("#section .news .list ul li").last());
            }
        }, 10);
        return newsIntervalId;
    }
    //#endregion news prev 함수

    //#region news next 함수
    function newsNextAnimation() {
        var newsIntervalId = setInterval(() => {
            $("#section .news .list ul").css({"top" : (newsTop += -1)});
            if(newsTop == -52) {
                clearInterval(newsIntervalId);
            } else if(newsTop == -104) {
                clearInterval(newsIntervalId);
                newsTop = -52;
                $("#section .news .list ul").css({"top" : newsTop});
                $("#section .news .list ul").append($("#section .news .list ul li").first());
            }
        }, 10);
        return newsIntervalId;
    }
    //#endregion news next 함수

    //#region slide animation
    $(".sub_slide .slide_navi .prev").click(function(){
        var contents = $(this).parent().prev();
        var left = Number(contents.find("li").css("width").replace("px", ""))
                       + Number(contents.find("li").css("margin-right").replace("px", ""));
        var li = $(this).next().find("li");
        var index = $(this).next().find("li.active").index();
        if(index > 0) {
            index--;
        } else {
            index = li.length - 1;
        }
        contents.css({"left" : -left * index});
        li.removeClass("active");
        li.eq(index).addClass("active");
    });
    $(".sub_slide .slide_navi .next").click(function(){
        var contents = $(this).parent().prev();
        var left = Number(contents.find("li").css("width").replace("px", ""))
                       + Number(contents.find("li").css("margin-right").replace("px", ""));
        var li = $(this).prev().find("li");
        var index = $(this).prev().find("li.active").index();
        if(index < li.length - 1) {
            index++;
        } else {
            index = 0;
        }
        contents.css({"left" : -left * index});
        li.removeClass("active");
        li.eq(index).addClass("active");
    });
    $(".sub_slide .slide_navi ul li").click(function(){
        var contents = $(this).parent().parent().prev();
        var left = Number(contents.find("li").css("width").replace("px", ""))
                 + Number(contents.find("li").css("margin-right").replace("px", ""));
        var li = $(this).parent().find("li");
        var index = $(this).index();
        contents.css({"left" : -left * index});
        li.removeClass("active");
        li.eq(index).addClass("active");
    });
    //#endregion slide animation

    //#region fix scroll
    $(".fix_top a").click(function(){
        $("html, body").animate( { scrollTop : 0 }, 1000, "swing");
    });
    //#endregion fix scroll

    //#region scroll event
    // fix_top scroll event
    $(window).scroll(function(){
        if($(window).scrollTop() <= 500) {
            $(".fix_top").removeClass("active");
        } else {
            $(".fix_top").addClass("active");
        }
    });

    // contents scroll반응 animation 함수
    function scrollEvent() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height() - 100;
        var contents = $("#section > div");
        // scroll 이벤트 모두 보여주면 off
        if(contents.last().hasClass("view")){
            $(window).off("scroll", scrollEvent);
        }
        for(var i = 0; i < contents.length; i++){
            var offsetTop = contents.eq(i).offset().top;
            var elementHeight = contents.eq(i).height();
            if((scrollTop + windowHeight >= offsetTop + (elementHeight / 3))
                && !contents.eq(i).hasClass("view")) {
                contents.eq(i).addClass("view");
            }
        }
    }
    //#endregion scroll event

    //#region redirection
    function isMobile(){
        let UserAgent = navigator.userAgent;
        if(UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null
            || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
            return true;
        } else {
            return false;
        }
    }
    function redirection(){
        if(isMobile()){
            // 모바일페이지
        } else {
            // PC페이지
        }
    }
    //#endregion redirection

    init();
});