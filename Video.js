var isVideoMirrored = false;
var my_canvas = document.getElementById('canvas_video');
var ctx = my_canvas.getContext('2d');
var my_video = document.getElementById('video1');
ctx.transform(1,0,0,-1,0,my_canvas.height);
var hasVideoChanged = false;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formVideoSubmit() {
    var my_url = document.forms["videoForm"]["url_video"].value;
    if (my_url == ""){
        alert("Please enter a valid ulr");
        return;
    }
    var offset = document.forms["videoForm"]["offset"].value;

    if (isNaN(offset)) offset = 0;
    my_video.src = my_url + '#t=' + String(offset);
    my_video.play().catch(function () {
        alert('your link is not working, please try again');
    });

    hasVideoChanged = true;
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

    deg += 90;

    my_video.style.webkitTransform = 'rotate('+deg+'deg)';
    my_video.style.mozTransform    = 'rotate('+deg+'deg)';
    my_video.style.msTransform     = 'rotate('+deg+'deg)';
    my_video.style.oTransform      = 'rotate('+deg+'deg)';
    my_video.style.transform       = 'rotate('+deg+'deg)';
    my_canvas.style.webkitTransform = 'rotate('+deg+'deg)';
    my_canvas.style.mozTransform    = 'rotate('+deg+'deg)';
    my_canvas.style.msTransform     = 'rotate('+deg+'deg)';
    my_canvas.style.oTransform      = 'rotate('+deg+'deg)';
    my_canvas.style.transform       = 'rotate('+deg+'deg)';
}

function changeControls() {
    my_video.controls = !my_video.controls;
}



function mirrorVideo( new_mirror = true) {
    if (new_mirror) isVideoMirrored = !isVideoMirrored;
    if (isVideoMirrored) loop();
    var width_ratio;
    var height_ratio;
    var x = 0;
    var y = 0;
    function calculateNewDimension() {
        width_ratio = my_video.videoWidth / my_video.width;
        height_ratio = my_video.videoHeight / my_video.height;
        /*console.log(my_video.videoWidth);
        console.log(my_video.width);
        console.log(width_ratio);
        console.log(height_ratio);*/
        if (width_ratio > height_ratio) {
            height_ratio = my_video.videoHeight / width_ratio;
            width_ratio = my_video.videoWidth / width_ratio;
            y = (my_video.height - height_ratio) / 2;
            x = 0;

        }
        else {
            width_ratio = my_video.videoWidth / height_ratio;
            height_ratio = my_video.videoHeight / height_ratio;
            y = 0;
            x = (my_video.width - width_ratio) / 2;

        }
    /*    console.log(my_video.videoWidth);
        console.log(my_video.videoHeight);
        console.log(width_ratio);
        console.log(height_ratio);
        console.log(my_canvas.clientWidth);
        console.log(my_canvas.clientHeight); */
    }
    calculateNewDimension();
    async function loop() {
        if (hasVideoChanged){
            ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
            hasVideoChanged = false;
            calculateNewDimension();
            await sleep(1000);
            mirrorVideo(false);
        }
        if (isVideoMirrored){
            ctx.drawImage(my_video, x, y,  width_ratio, height_ratio);
            setTimeout(loop, 1000 / 30);
        }
    }
}