$(document).ready(function() {
    var videoCanvas = document.getElementById("video-canvas");
    var videoBtn = $('#snap');
    var context = videoCanvas.getContext("2d");
    var video = document.getElementById("video");
    var errBack = function(error) {
        console.log("Video capture error: ", error.code); 
    };

    videoBtn.click(function() {
        context.drawImage(video, 0, 0, 640, 480);
    });

    // Put video listeners into place
    if(navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia({ video: true }, function(stream){
            video.src = window.webkitURL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
});
