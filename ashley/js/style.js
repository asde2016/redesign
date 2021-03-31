// #region const (애슐리 지도 좌표 [지점명, [위도, 경도]])
const ashleyLoc = [
    [ "애슐리W 롯데피트인 산본점", [37.35771036712975, 126.93064812569224] ],
    [ "애슐리 평촌뉴코아아울렛점", [37.389140731934226, 126.95117116471631] ],
    [ "애슐리W 가산재능점", [37.481794730286374, 126.88156570582073] ],
    [ "애슐리 동수원뉴코아아울렛점", [37.26636306682251, 127.03432310582075] ],
    [ "애슐리 서울대입구점", [37.480850826667016, 126.95231530582075] ],
    [ "애슐리W NC수원터미널점", [37.250174466879855, 127.01988480582074] ],
    [ "애슐리 안산고잔NC점", [37.313420966655684, 126.83100556471632] ],
    [ "애슐리퀸즈 수원망포점", [37.24516023448802, 127.06193837637296] ],
    [ "애슐리 분당이천일", [37.349035733470714, 127.10740766471629] ],
    [ "애슐리 TOGO롯데관악점", [37.490420401920346, 126.92485680582074] ],
    [ "애슐리퀸즈 신촌점", [37.5562572342081, 126.9345497647163] ],
    [ "애슐리퀸즈 잠실롯데캐슬점", [37.51444519782292, 127.10000167637297] ],
    [ "애슐리 여의도점", [37.52427226590595, 126.92777966471631] ],
    [ "애슐리퀸즈 야탑뉴코아아울렛점", [37.41074699893015, 127.12779122361188] ],
    [ "애슐리퀸즈 잠실웰빙센터점", [37.51117843404738, 127.09798563526853] ],
    [ "애슐리퀸즈 부천뉴코아아울렛점", [37.50422553402266, 126.75673837637295] ],
    [ "애슐리 종각역점", [37.57070203425964, 126.98354882361188] ],
    [ "애슐리퀸즈 수원망포점", [37.25936932379527, 127.06193668795892] ],
    [ "애슐리퀸즈 NC강서점", [37.572427796088064, 126.8480683878956] ],
    [ "애슐리 인천간석홈플러스점", [37.482805178390734, 126.68774156023937] ],
    [ "애슐리 상봉홈플러스점", [37.61860994066477, 127.09665724155147] ],
    [ "애슐리 노들나루점", [37.52575686590066, 126.93833720582074] ],
    [ "애슐리 중계홈플러스점", [37.65993378545723, 127.06507155090728] ],
    [ "애슐리W NC송파점", [37.47758146607229, 127.12489113526853] ],
    [ "애슐리퀸즈 NC강서점", [37.55990827110562, 126.84051496471629] ],
    [ "애슐리 부평아이즈빌점", [37.544714403354654, 126.69959670322515] ],
    [ "애슐리 건대스타시티점", [37.56757679319124, 127.06901195467297] ],
];
// #endregion const

$(function(){
    // #region init
    // 카카오맵, 현재위치 읽어와서 맵 마커 찍기
    getLocation();
    
    var main_swiper = new Swiper('.main_visual .swiper-container', {
        pagination: {
            el: '.main_visual .swiper-pagination',
        },
        autoplay: {
            delay: 5000,
        },
    });
    var sub_swiper_01 = new Swiper('.content_03 .swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 10,
        pagination: {
            el: '.content_03 .swiper-pagination',
            clickable: true,
        },
        scrollbar: {
            el: '.content_03 .swiper-scrollbar',
            hide: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 1.5
            },
            1000: {
                slidesPerView: 2.5
            },
        }
    });
    var sub_swiper_02 = new Swiper('.content_05 .swiper-container', {
        slidesPerView: 1.5,
        spaceBetween: 10,
        pagination: {
            el: '.content_05 .swiper-pagination',
            clickable: true,
        },
        scrollbar: {
            el: '.content_05 .swiper-scrollbar',
            hide: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 1.5
            },
            1000: {
                slidesPerView: 2.5
            },
        }
    });

    $("a[href='#']").click(function(e){
        e.preventDefault();
    });

    // swiper slide autoplay 버튼 추가
    $(".main_visual .swiper-pagination").append("<span class='autoplay on' href='#'>autoplay</span>");
    // #endregion init

    // #region 탭 클릭 이벤트
    $(".tab").click(function(){
        $(".dim").fadeIn(300);
        $(".dim").addClass("active");
        $("#mobile").addClass("active");
        setTimeout(() => {
            // 자연스럽게 스크롤이 안보이도록, 탭이 열리는 애니메이션이 끝나는 시간과 같도록
            $("html").addClass("fixed");
        }, 300);
    });
    $(".tab_close").click(function(){
        $(".dim").fadeOut(300);
        $(".dim").removeClass("active");
        $("#mobile").removeClass("active");
        $("html").removeClass("fixed");
    });
    // #endregion 탭 클릭 이벤트

    // #region 탭 하위메뉴 클릭 이벤트
    $("#mobile .mobile_inner > ul > li").click(function(){
        var sub = $(this).find(".sub");
        if(sub[0] != null) {
            if($(this).hasClass("active")) {
                sub.slideUp(300);
                $(this).removeClass("active");
            } else {
                $(this).siblings().removeClass("active");
                $(this).siblings().find(".sub").slideUp(300);
                
                sub.slideDown(300);
                $(this).addClass("active");
            }
        }
    });
    // #endregion 탭 메뉴 클릭 이벤트

    // #region swiper slide 클릭 이벤트
    $(".autoplay").click(function(){
        if($(this).hasClass("on")) {
            $(this).removeClass("on");
            main_swiper.autoplay.stop();
        } else {
            $(this).addClass("on");
            main_swiper.autoplay.start();
        }
    });
    // #endregion swiper slide 클릭 이벤트

    // #region 카카오맵 가져오기
    function getKakaoMap(loc) {
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(loc[1][0], loc[1][1]), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(loc[1][0], loc[1][1]); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        var iwContent = "<div class='info_window'><h5>" + loc[0] + "</h5></div>", // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(loc[1][0], loc[1][1]); //인포윈도우 표시 위치입니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            position : iwPosition, 
            content : iwContent 
        });
        
        // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
        infowindow.open(map, marker); 
    }
    // #endregion 카카오맵 가져오기

    // #region 현재위치에서 가까운 애슐리 찾기
    function getLocation() {
        var nearestLoc;
        var nearestDistance = 0;
        if (navigator.geolocation) { // GPS를 지원하면
            navigator.geolocation.getCurrentPosition(function(position) {
            for(var i = 0; i < ashleyLoc.length; i++){
                var fromLat = position.coords.latitude;
                var fromLon = position.coords.longitude;
                var toLat = ashleyLoc[i][1][0];
                var toLon = ashleyLoc[i][1][1];
                var dist = getDistFromLatLonInKm(fromLat, fromLon, toLat, toLon);
                if(nearestDistance == 0 || nearestDistance > dist) {
                    nearestLoc = ashleyLoc[i];
                    nearestDistance = dist;
                }
            }
            getKakaoMap(nearestLoc);
            }, function(error) {
                console.error(error);
            }, {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: Infinity
            });
        } else {
            console.log('GPS를 지원하지 않습니다');
        }
    }
    // #endregion 현재위치에서 가까운 애슐리 찾기

    // #region 각도단위를 도에서 라디안으로 변환
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
    // #endregion 각도단위를 도에서 라디안으로 변환

    // #region 위도경도로 거리 구하기(km)
    function getDistFromLatLonInKm(fromLat, fromLon, toLat, toLon) {
        var r = 6371; //지구의 반지름(km)
        var dLat = deg2rad(toLat-fromLat);
        var dLon = deg2rad(toLon-fromLon);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(fromLat)) * Math.cos(deg2rad(toLat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = r * c; // Distance in km
        return Math.round(d*1000);
    }
    // #endregion 위도경도로 거리 구하기(km)
});