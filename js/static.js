$(document).ready(function (e) {
    var COUNT = 0;
    var FINAL_COUNT = 25;
    $('#count-text').text(`0/${FINAL_COUNT}`);
    $('#leave_from_mouse').mousemove(function (e) {
        if (COUNT < FINAL_COUNT) {
            COUNT = COUNT + 1
            $(this).css("left", Math.ceil(Math.random() * ($(document).width() - 30)), "px");
            $(this).css("top", Math.ceil(Math.random() * ($(document).height() - 30)), "px");
            $('.count-text').css("animation", "bubble .2s");
            $('#count-text').text(`${COUNT}/${FINAL_COUNT}`);
        }
    });
    $('.button-29').click(function (e) {
        if (COUNT == FINAL_COUNT) {
            $('.container').hide();
            setTimeout(() => {
                $('.container-welcome').fadeIn();
                setTimeout(() => {
                    $('.card').hide();
                    $('#video-block').fadeIn(500);
                    $('video').trigger('play')
                }, 5000);
            }, 1000);
        }
    });

    var BoxOpened = "";
    var ImgOpened = "";
    var Counter = 0;
    var ImgFound = 0;

    var Source = "#boxcard";

    var ImgSource = [
        "./assets/1.jpg",
        "./assets/2.jpg",
        "./assets/3.jpg",
        "./assets/4.jpeg",
        "./assets/5.jpeg",
        "./assets/6.jpg",
        "./assets/7.jpeg",
        "./assets/8.jpeg",
        "./assets/9.jpg",
        "./assets/10.jpg"
    ];

    $("#player").bind("ended", function () {
        $('.container-welcome').hide();
        setTimeout(() => {
            newCatGIF()

            function newCatGIF() {
                fetch('https://api.giphy.com/v1/gifs/translate?api_key=z4L4W8mw0SgWTkLcbb9BIkykMbaZ7hvf&s=random-cat')
                    .then((response) => {
                        console.log('requested');
                        return response.json();
                    })
                    .then((response) => {
                        setTimeout(changeImage.bind(null, response.data.images.original.url), 1000);
                        console.log('came!');
                    })
            }

            function changeImage(url) {
                let catImage = $('#cat-img');
                catImage.attr('src', url)
            }
            $('.container-weeding').fadeIn();
        }, 1000);
    });

    var savePNGButton = $("#save");
    var clearButton = $("#clear");
    const canvas = document.querySelector("canvas");
    const signaturePad = new SignaturePad(canvas, {});

    const data = signaturePad.toData();
    signaturePad.fromData(data);

    savePNGButton.click(function (e) {
        $('.card-form').hide();
        $('#picbox').fadeIn();

        function RandomFunction(MaxValue, MinValue) {
            return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
        }

        function ShuffleImages() {
            var ImgAll = $(Source).children();
            var ImgThis = $(Source + " div:first-child");
            var ImgArr = new Array();

            for (var i = 0; i < ImgAll.length; i++) {
                ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
                ImgThis = ImgThis.next();
            }

            ImgThis = $(Source + " div:first-child");

            for (var z = 0; z < ImgAll.length; z++) {
                var RandomNumber = RandomFunction(0, ImgArr.length - 1);

                $("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
                ImgArr.splice(RandomNumber, 1);
                ImgThis = ImgThis.next();
            }
        }

        function ResetGame() {
            ShuffleImages();
            $(Source + " div img").hide();
            $(Source + " div").css("visibility", "visible");
            Counter = 0;
            $("#success").remove();
            $("#counter").html("" + Counter);
            BoxOpened = "";
            ImgOpened = "";
            ImgFound = 0;
            return false;
        }

        function OpenCard() {
            var id = $(this).attr("id");
            var clicka = new Audio(`./assets/click.wav`);
            clicka.oncanplay = function () {
                clicka.volume = .5;
                clicka.play();
            };
            if ($("#" + id + " img").is(":hidden")) {
                $(Source + " div").unbind("click", OpenCard);

                $("#" + id + " img").slideDown('fast');
                if (ImgOpened == "") {
                    BoxOpened = id;
                    ImgOpened = $("#" + id + " img").attr("src");
                    setTimeout(function () {
                        $(Source + " div").bind("click", OpenCard)
                    }, 300);
                } else {
                    CurrentOpened = $("#" + id + " img").attr("src");
                    if (ImgOpened != CurrentOpened) {
                        var audio = new Audio(`./assets/error.mp3`);
                        audio.oncanplay = function () {
                            audio.volume = .5;
                            audio.play();
                        };
                        setTimeout(function () {
                            $("#" + id + " img").slideUp('fast');
                            $("#" + BoxOpened + " img").slideUp('fast');
                            BoxOpened = "";
                            ImgOpened = "";
                        }, 400);
                    } else {
                        var audio = new Audio(`./assets/collect.mp3`);
                        audio.oncanplay = function () {
                            audio.volume = .5;
                            audio.play();
                        };
                        $("#" + id + " img").parent().css("visibility", "hidden");
                        $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
                        ImgFound++;
                        BoxOpened = "";
                        ImgOpened = "";
                    }
                    setTimeout(function () {
                        $(Source + " div").bind("click", OpenCard)
                    }, 400);
                }
                Counter++;
                $("#counter").html("" + Counter);

                if (ImgFound == ImgSource.length) {
                    $('#picbox').hide();
                    var music = new Audio(`./assets/Lham.wav`);
                    music.oncanplay = function () {
                        music.volume = 1.0;
                        music.play();
                    };
                    setTimeout(() => {
                        function upTime(countTo) { // fuction สำหรับคำนวณเวลา


                            now = new Date(); // วันที่ปัจจุบัน object
                            countTo = new Date(countTo); // ทำค่าที่รับเข้ามาจาก countTo วันที่ให้เป็น object
                            difference = (now - countTo); // นำวันเวลาปัจจุบันกับค่าที่ได้รับมาลบกัน 

                            // ในส่วนนี้เป็นการคำนวณหาจำนวนวัน ชั่วโมง นาที และวินาที
                            days = Math.floor(difference / (60 * 60 * 1000 * 24) * 1);
                            years = Math.floor(days / 365);
                            if (years >= 1) {
                                days = days - (years * 365)
                            }
                            hours = Math.floor((difference % (60 * 60 * 1000 * 24)) / (60 * 60 * 1000) * 1);
                            mins = Math.floor(((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) / (60 * 1000) * 1);
                            secs = Math.floor((((difference % (60 * 60 * 1000 * 24)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000 * 1);
                            // นำตัวค่าที่ได้มาใส่ใน element html ที่เตรียมไว้ 
                            $(".up_y").text(years);
                            $(".up_d").text(days);
                            $(".up_h").text(hours);
                            $(".up_m").text(mins);
                            $(".up_s").text(secs);

                            // set ให้คำนวณใหม่ทุกๆ 1 วินาที 
                            clearTimeout(upTime.to);
                            upTime.to = setTimeout(function () {
                                upTime(countTo);
                            }, 1000);
                        }

                        // init datetimepicker ใน id yearinput
                        $('#yearinput').appendDtpicker({
                            "inline": false,
                            "current": "2022-6-18 00:00"

                        });
                        START()
                        // จับ event ในการกดปุ่มคำนวณ	 
                        function START() {

                            // ดึง object date จาก datepicker
                            var date = $('#yearinput').handleDtpicker('getDate');


                            // ส่วนนี้เป็นการจัดเรียงรูปแบบ date ให้เป็น string เพื่อใส่ใน function upTime()			
                            var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
                                'Dec'
                            ];
                            var month = month_names_short[date.getMonth()];
                            var day = date.getDate();
                            var year = date.getFullYear();
                            var h_r = date.getHours();
                            var m_r = date.getMinutes();
                            var s_r = date.getMilliseconds();
                            var usein = month + ',' + day + ',' + year + ',' + h_r + ':' + m_r + ':' + s_r;

                            // เรียกใช้ upTime			
                            upTime(usein);
                            return false;

                        };
                        $('.cer').fadeIn();
                        setTimeout(() => {
                            $('#marriagename').text(`ศศิการน์ แก้วประชา`)
                            $('#signature_img').attr('src', signaturePad.toDataURL());
                        }, 500);
                    }, 1000);
                }
            }
        }

        $(function () {

            for (var y = 1; y < 3; y++) {
                $.each(ImgSource, function (i, val) {
                    $(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
                });
            }
            $(Source + " div").click(OpenCard);
            ShuffleImages();
        });
    });
    clearButton.click(function (e) {
        signaturePad.clear();
    });

});