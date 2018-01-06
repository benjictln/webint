function formVideoSubmit() {
    var url = document.forms["videoForm"]["url_video"].value;
    if (url == ""){
        alert("Please enter a valid ulr");
        return;
    }
    var video_avi = document.getElementById('video_src_avi');
    var video_mp4 = document.getElementById('video_src_mp4');
    var video_ogv = document.getElementById('video_src_ogv');

    video_avi.src='https://archive.org/download/summer-rapid-july2017/summer-rapid-240x350.mp4'
    video_mp4.src='https://archive.org/download/summer-rapid-july2017/summer-rapid-240x350.mp4'
    video_ogv.src='https://archive.org/download/summer-rapid-july2017/summer-rapid-240x350.mp4'

    document.getElementById('video1').play();

}