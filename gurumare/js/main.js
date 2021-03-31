$(function(){
    var _lang = getParameter("lang");

    // 이니셜라이즈
    init();

    // 클릭 이벤트 막기
    $("a[href='#']").click(function(e){
        e.preventDefault();
    });

    // 새로고침시 첫번째 화면으로 이동
    setTimeout(function(){
        $("html").scrollTop(0);
    }, 100);

    // 윈도우 resize 이벤트
    $(window).resize(function(){
        var index = $(".fixed_menu ul li.active").index();
        var height = $(window).height();
        $(".section .section_inner > div").css({width : "100vw", height : "100vh"});
        $("html").scrollTop(height * index);
    });

    // swiper.js (main keyvisual)
    var keyvisualSwiper = new Swiper('.keyvisual .swiper-container', {
      pagination: {
        el: '.keyvisual .swiper-pagination',
        clickable: true,
      },
    });

    // swiper.js (공지사항, 모바일)
    var content01Swiper = new Swiper('.content_01 .swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 16,
        breakpoints: {
            500: {
                slidesPerView: 1.5
            },
            501: {
                slidesPerView: 2.5
            }
        },
    });

    // swiper.js (대관안내, 모바일)
    var content03Swiper = new Swiper('.content_03 .swiper-container', {
        slidesPerView: "auto",
        spaceBetween: 16,
        freeMode: true,
    });

    // swiper.js (대관안내, 데스크톱, 모바일)
    var content04Swiper = new Swiper('.content_04 .swiper-container', {
        slidesPerView: "1.2",
        spaceBetween: 16,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            500: {
                slidesPerView: 1.2
            },
            1001: {
                slidesPerView: 1.5
            },
        },
    });
    // swiper.js 슬라이드시 배경화면 변경
    content04Swiper.on('slideChange', function (e) {
        var index = e.activeIndex + 1;
        $(".content_04 > div").removeClass("active");
        $(".content_04 .f" + index).addClass("active");
    });

    // swiper.js (공연안내, 데스크톱, 모바일)
    var content05Swiper = new Swiper('.content_05 .swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 16,
        breakpoints: {
            500: {
                slidesPerView: 1.5
            },
            501: {
                slidesPerView: 2.5
            },
            1001: {
                slidesPerView: 3.5
            },
        },
    });

    // 마우스휠 이벤트
    $("html").on("mousewheel", function(e, delta) {
        if($("html").is(":animated")) return;
        if($(".site_map").hasClass("active")) return;

        var scrollTop = $(window).scrollTop();
        var height = $(window).height();

        if(delta > 0) {
            scrollTop -= height;
        } else {
            scrollTop += height;
        }

        var index = Math.round(scrollTop < 0 ? 0 : scrollTop / height);

        if(index > $(".fixed_menu ul li:last-child").index()) return;

        scrollAnimation(index);
    });

    // fixed menu 클릭 이벤트
    $(".fixed_menu ul li").click(function() {
        if($("html").is(":animated")) return;

        var index = $(this).index();

        scrollAnimation(index);
    });

    // 사이트맵 열기
    $(".btn_open").click(function(){
        $(".site_map").fadeIn(300);
        $(".site_map").addClass("active");
    });

    // 사이트맵 닫기
    $(".btn_close").click(function(){
        $(".site_map").fadeOut(300);
        $(".site_map").removeClass("active");
    });

    // 언어 변경
    $(".lang").click(function(){
        if(_lang == "ko") {
            _lang = "en";
        } else if(_lang == "en") {
            _lang = "ko";
        }
        location.href = location.href.split("?")[0] + "?lang=" + _lang;
        localStorage.setItem("lang", _lang);
    });
    
    // scroll아이콘 클릭 이벤트
    $(".main_scroll a").click(function(){
        scrollAnimation(1);
    });

    // 공지사항 메뉴 클릭 이벤트
    $(".content_01 .content_menu li").click(function(){
        $(".content_01 .content_menu li").removeClass("active");
        var index = $(this).index();
        
        $(".content_01 .desktop .content_menu li").eq(index).addClass("active");
        $(".content_01 .mobile .content_menu li").eq(index).addClass("active");
        var cont = $(".content_01 .desktop  > ul > li");
        changeNotice("desktop", cont, $(this).text());
        cont = $(".content_01 .mobile .swiper-slide");
        changeNotice("mobile", cont, $(this).text());
    });

    // 대관안내 메뉴 클릭 이벤트
    $(".content_03 .desktop .content_menu li").click(function(){
        $(".content_03 .mobile .content_menu a").removeClass("active");
        $(".content_03 .desktop .content_menu li").removeClass("active");
        
        var index = $(this).index();
        $(this).addClass("active");
        $(".content_03 .mobile .content_menu a").eq(index).addClass("active");

        var cont = $(".content_03 .desktop .right > ul li li");
        changeRental("desktop", cont, $(this).text());
        cont = $(".content_03 .mobile > ul li li");
        changeRental("mobile", cont, $(this).text());
    });
    $(".content_03 .mobile .content_menu a").click(function(){
        $(".content_03 .mobile .content_menu a").removeClass("active");
        $(".content_03 .desktop .content_menu li").removeClass("active");

        var index = $(this).parent().index();
        $(this).addClass("active");
        $(".content_03 .desktop .content_menu li").eq(index).addClass("active");

        var cont = $(".content_03 .desktop .right > ul li li");
        changeRental("desktop", cont, $(this).text());
        cont = $(".content_03 .mobile > ul li li");
        changeRental("mobile", cont, $(this).text());
    });

    // 공지사항 data binding
    function changeNotice(type, cont, group){
        var index = type == "desktop" ? 1 : 0;
        if(_lang == "en") {
            if(lang.hasOwnProperty(group)) {
                group = lang[group]["ko"];
            }
        }
        for(var i = index; i < cont.length; i++) {
            var html = "<a href='#'>" +
                            "<dl>" +
                                "<dt>" +
                                    "<p data-lang='trans'>" + group + "</p>" +
                                    "<p data-lang='trans'>" + cont_01[group][i-index].title + "</p>" +
                                "</dt>" +
                                "<dd>" +
                                    "<p data-lang='trans'>" + cont_01[group][i-index].desc + "</p>" +
                                    "<p data-lang='trans'>" + cont_01[group][i-index].date + "</p>" +
                                "</dd>" +
                            "</dl>" +
                        "</a>";
            
            $(cont[i]).html(html);
            InitLanguagePack();
        }
    }

    // 대관안내 data binding
    function changeRental(type, cont, group){
        cont.parent().parent().find($(".title span")).html(group);
        console.log(cont.parent().parent());
        if(_lang == "en") {
            if(lang.hasOwnProperty(group)) {
                group = lang[group]["ko"];
            }
        }
        for(var i = 0; i < cont.length; i++) {
            var title = "";
            var price = "";
            var time = "";

            if(i < 2) {
                if(cont_03[group]["평일"][i] != null) {
                    title = cont_03[group]["평일"][i].title;
                    price = cont_03[group]["평일"][i].price;
                    time = cont_03[group]["평일"][i].time;
                }
            } else {
                if(cont_03[group]["주말"][i-2] != null) {
                    title = cont_03[group]["주말"][i-2].title;
                    price = cont_03[group]["주말"][i-2].price;
                    time = cont_03[group]["주말"][i-2].time;
                }
            }

            var html = "<dl>" +
                            "<dt>" +
                                "<p data-lang='trans'>" + title + "</p>" +
                            "</dt>" +
                            "<dd>" +
                                "<p data-lang='trans'>" + price + "<span data-lang='trans'>원</span></p>" +
                                "<p data-lang='trans'>" + time + "</p>" +
                            "</dd>" +
                       "</dl>";

            if(title != "") {
                $(cont[i]).html(html);
                InitLanguagePack();
            } else {
                $(cont[i]).html("");
            }
        }
    }

    // scroll 이벤트
    function scrollAnimation(index) {
        if($("html").is(":animated")) return;

        var height = $(window).height();

        if(index == 0) {
            $("#header").removeClass("active");
        } else {
            $("#header").addClass("active");
        }

        $(".fixed_menu ul li").removeClass("active");
        $(".fixed_menu ul li").eq(index).addClass("active");

        if(index > 0) {
            setTimeout(() => {
                $("#section .section_inner > div").eq(index).addClass("view");
            }, 500);
        }

        $("html").animate({scrollTop: height * index}, 500);
    }

    // get 파라미터 가져오기
    function getParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        if(results == null) {
            var item = localStorage.getItem("lang");
            if(item == null) {
                localStorage.setItem("lang", "ko");
                results = "ko";
            } else {
                results = item;
            }
        } else {
            results = decodeURIComponent(results[1].replace(/\+/g, " "));
        }

        return results;
    }

    // 언어팩
    function InitLanguagePack(){
        if(_lang != "ko"){
            $("[data-lang]").each(function(){
                var text = $(this).text().trim().replaceAll("  ", "");
                
                if(lang.hasOwnProperty(text)) {
                    $(this).html(lang[text][_lang]);
                }
            });
        }
    }

    // 이니셜라이즈
    function init(){
        InitLanguagePack();
    }
});