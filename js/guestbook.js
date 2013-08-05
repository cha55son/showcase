$(document).ready(function() {
    var videoCanvas = document.getElementById("guest-preview");
    var videoBtn = $('#guest-snap');
    var context = videoCanvas.getContext("2d");
    var video = document.getElementById("guest-video");
    var modal = $('#guest-modal');
    var cameraActivated = false;

    var snapImage = function() {
        context.drawImage(video, 0, 0, 220, 176);
    };

    videoBtn.click(function() {
        if (cameraActivated) {
            snapImage();
            modal.modal();
            return false;
        }
        
        var fnName = 'getUserMedia';
        if (typeof navigator.getUserMedia == 'undefined')
            fnName = 'webkitGetUserMedia';

        navigator[fnName]({ video: true, audio: true }, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
            videoBtn.text("Snap Photo");
            cameraActivated = true;
        }, function(err) {
            console.log('Video capture error: ', error.code);
        });
        return false;
    });
});
