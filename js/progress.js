$(document).ready(function() {
    var $slides = $(".slide");
    var $bar = $('.bar');
    var $curStep = $('#progress-current');
    var $totStep = $('#progress-total');

    var findActiveSlide = function() {
        var activeIndex = 0;
        $slides.each(function() {
            if ($(this).hasClass('active'))
                return false;
            activeIndex++;
        });
        return activeIndex + 1;
    };

    var setProgress = function(cur) {
        var width = cur / $slides.length * 100;
        if (width == 100)
            $bar.parent().addClass('progress-success');
        else
            $bar.parent().removeClass('progress-success');
        $bar.css('width', (cur / $slides.length * 100) + '%');
        $curStep.text(cur);
        $totStep.text($slides.length);
    };

    $slides.on('impress:stepenter', function() {
        setProgress(findActiveSlide())
    });
    setProgress(findActiveSlide())
});
