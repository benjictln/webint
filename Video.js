function formVideoSubmit() {
    var my_url = document.forms["videoForm"]["url_video"].value;
    if (my_url == ""){
        alert("Please enter a valid ulr");
        return;
    }
    var my_video = document.getElementById('video1');
    var offset = document.forms["videoForm"]["offset"].value;

    if (isNaN(offset)) offset = 0;
    my_video.src = my_url + '#t=' + String(offset);
    my_video.play();
    /*var video_avi = document.getElementById('video_src_avi');
    var video_mp4 = document.getElementById('video_src_mp4');
    var video_ogv = document.getElementById('video_src_ogv');

    video_avi.src='https://archive.org/download/summer-rapid-july2017/summer-rapid-240x350.mp4'
    video_mp4.src='https://archive.org/download/summer-rapid-july2017/summer-rapid-240x350.mp4'
    video_ogv.src='https://archive.org/download/summer-rapid-july2017/summer-rapid-240x350.mp4'

    document.getElementById('video1').play();*/

}

function previewVideo() {

    var my_url = document.forms["videoForm"]["url_video"].value;
    if (my_url == ""){
        alert("Please enter a valid ulr");
        return;
    }
    var my_video_preview = document.getElementById('video_preview');
    my_video_preview.src = my_url + '&end=5';
    my_video_preview.autoplay;
    my_video_preview.play();
}
var deg = 0;
function rotateVideo() {

    my_video = document.getElementById('video1');
    deg += 90;
    my_video.style.webkitTransform = 'rotate('+deg+'deg)';
    my_video.style.mozTransform    = 'rotate('+deg+'deg)';
    my_video.style.msTransform     = 'rotate('+deg+'deg)';
    my_video.style.oTransform      = 'rotate('+deg+'deg)';
    my_video.style.transform       = 'rotate('+deg+'deg)';
}