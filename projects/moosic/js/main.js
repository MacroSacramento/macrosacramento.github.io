$(document).ready(() => {

    //Nav toggle
    if (window.innerWidth < 900) {
        $('.nav-button').click(() => {
            $('.nav-menu').toggle(300);
            $('.navbar-nav').toggleClass('bottom-shadow');
        });
        $('.nav-item').click(() => {
            $('.nav-menu').toggle(300);
            $('.navbar-nav').toggleClass('bottom-shadow');
        })
    } else {
        $('.nav-item > a').click(function () {
            $('.nav-item > a').removeClass('active')
            $(this).addClass('active')
        })
    }

    let songCount = -1;
    let albumLength = 0;

    $('.song').each((i, el) => {
        songCount++;
        let songTime = (i != 0) ? $(el).children('.time').text() : "0:00";
        albumLength += convertToSeconds(songTime)
    });
    albumLength = convertToTimes(albumLength).split(':')
    console.log(`${songCount} Songs, ${albumLength[0]}m ${albumLength[1]}s`)
    $('.song-count').text(songCount);
    $('.album-length').text(`${albumLength[0]}m ${albumLength[1]}s`)

    //     MEDIA PLAYER     //
    let mediaPlayer = document.querySelector('.media')
    let mediaCurrentTime = $('.time-playing')
    let mediaDuration = $('.time-duration')
    let mediaTimeController = document.querySelector('.media-time')
    let playButton = $('.btn-play')

    mediaPlayer.src = "https://rr3---sn-a5mlrn76.googlevideo.com/videoplayback?expire=1649472671&ei=P6BQYquJOYWpkgaHoITIAg&ip=68.2.226.111&id=o-AHwbFQHIC81HekX_ChzJYs2JxkOFMSHSZx8Wf-CwTX7U&itag=18&source=youtube&requiressl=yes&mh=tf&mm=31%2C26&mn=sn-a5mlrn76%2Csn-n4v7snl7&ms=au%2Conr&mv=m&mvi=3&pl=16&gcr=us&initcwndbps=1511250&spc=4ocVCzIv3DOiM5BSiU62jjjnncGp&vprv=1&mime=video%2Fmp4&ns=5gyPJ9JZhj9cH03bUR7i0YMG&gir=yes&clen=3505274&ratebypass=yes&dur=200.782&lmt=1575727676988433&mt=1649450714&fvip=3&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=zCwE_hl7vkp2Mw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgE1L8uQz7kzgBiVprP9GjnlLmbwsS3MHft05FbOIYROYCIQD9lztxsT99PsF8yr2ycULLHP8_n0hE9ECFSkqDDqHI-g%3D%3D&sig=AOq0QJ8wRAIgM7V9RRV6jaVyWgjpcqQWsIaDbXZDaDAVX-jZ4u49dJACIH2ZmYq8-luFOkbWZdXAaiYBkSRNmDRqQUgXQJNnxb0L"

    mediaPlayer.load()

    //On song load
    mediaPlayer.addEventListener("canplaythrough", (e) => {
        mediaDuration.text(convertToTimes(mediaPlayer.duration)); //updates duration text
        mediaTimeController.max = mediaPlayer.duration; //updates time scrubber length

        //changes time scrubber and current time
        mediaPlayer.addEventListener("timeupdate", (e) => {
            mediaCurrentTime.text(convertToTimes(mediaPlayer.currentTime));
            mediaTimeController.value = mediaPlayer.currentTime;
        })

        mediaTimeController.addEventListener("change", () => {
            mediaPlayer.currentTime = mediaTimeController.value;
        })
    })

    //play/pause
    playButton.click(() => {
        if (mediaPlayer.paused) {
            playing = true;
            playButton[0].src = './assets/SVG/icon-pause.svg'
            mediaPlayer.play()
        } else {
            playing = false;
            playButton[0].src = './assets/SVG/icon-play.svg'
            mediaPlayer.pause()
        }
    })

    function convertToSeconds(t) {
        let time = (t + "").split(':')
        let minutes = time[0]
        let seconds = time[1]
        seconds = Math.floor(parseInt(seconds) + parseInt(minutes)*60)
        return (seconds)
    }

    function convertToTimes(secs) {
        let minutes = Math.floor(secs / 60);
        let seconds = Math.floor(secs % 60);
        if (seconds < 10) { seconds = `0${seconds}` };
        return `${minutes}:${seconds}`;
    }

});