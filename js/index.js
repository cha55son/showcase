$(document).ready(function() {
    var api = impress();
    api.init();

    var solarsystemStep = $('#solarsystem');
    solarsystemStep.height($(window).height())
                   .width($(window).width());
    $('iframe', solarsystemStep).css({ height: '100%', width: '50%' });
});
