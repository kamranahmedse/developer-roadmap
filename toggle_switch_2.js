  feather.replace();    

    $(document).ready(function(){
        $('.toggle input[type="checkbox"]').click(function(){
            $(this).parent().toggleClass('on');

            if ($(this).parent().hasClass('on')) {
                $(this).parent().children('.label').text('On')
            } else {
                $(this).parent().children('.label').text('Off')
            }
        });

        $('.checkbox input[type="checkbox"]').click(function(){
            $(this).parent().toggleClass('on');

            if ($(this).parent().hasClass('on')) {
                $(this).parent().children('.label').text('On')
            } else {
                $(this).parent().children('.label').text('Off')
            }
        });

        $('.radio input[type="radio"]').click(function(){
            $(this).parent().addClass('on');

            if ($(this).parent().hasClass('on')) {
                $(this).parent().children('.label').text('On')
            }
        });
        $('input').focusin (function() {
            $(this).parent().addClass('focus');
        });
        $('input').focusout (function() {
            $(this).parent().removeClass('focus');
        });
    });
