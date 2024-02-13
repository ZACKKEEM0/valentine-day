$(document).ready(function (e) {
    var COUNT = 0;
    var FINAL_COUNT = 5;
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
                    var video = document.getElementById("player");
                    if (video.requestFullscreen) {
                        video.requestFullscreen();
                    } else if (video.mozRequestFullScreen) {
                        video.mozRequestFullScreen();
                    } else if (video.webkitRequestFullscreen) {
                        video.webkitRequestFullscreen();
                    }
                    $('video').trigger('play')
                }, 5000);
            }, 1000);
        }
    });

});