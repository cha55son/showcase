$(document).ready(function() {
    var api = impress();
    api.init();

    // Solarsystem
    var solarsystemStep = $('#solarsystem');
    solarsystemStep.height($(window).height())
                   .width($(window).width());
    $('iframe', solarsystemStep).css({ height: '100%', width: '50%' });
    $(window).resize(function() {
        solarsystemStep.height($(window).height())
                       .width($(window).width());
    });

    // Toggle instructions
    $('#start').on('impress:stepenter impress:stepleave', function() {
        $('.hint').fadeToggle();
    });

    // Open all links in a new window
    $('a').click(function() {
        window.open($(this).attr('href'), "_blank");
        return false;
    });
});
