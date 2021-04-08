(function () {
    var bv = new Bideo();
    bv.init({
        videoEl: document.querySelectorAll('.background_video'),
        container: document.querySelectorAll('body'),
        resize: true,
        isMobile: window.matchMedia('(max-width: 768px)').matches,
        playButton: document.querySelectorAll('.play'),
        pauseButton: document.querySelectorAll('.pause'),
        /*onLoad: function () {
            document.querySelectorAll('.video_cover').style.display = 'none';
        }*/
    });
}());

