$(function () {
    //$('#checkPasswd').focus();

    $('input[type="text"],input[type="password"],select').each(function () {
        var $input = $('input[type="text"],input[type="password"],select');

        var dindex = $input.index(this);

        //var ival = this.value;
        var csize = $input.size() - 1;

        $(this).focusin(function (e) {

            var ival = $(this).val();
            var placeholder = $(this).attr('placeholder');
            // avalon.log(ival);  
            if (!ival) {

                avalon.vmodels.ChangePassword.messagecss = "show alert-warning";
                avalon.vmodels.ChangePassword.message = (dindex + 1) + messages.n2 + placeholder;

            } else {
                avalon.log("has contents.")
                // avalon.vmodels.ChangePassword.messagecss = "hidden";
                // avalon.vmodels.ChangePassword.message = " ";
            }
        });
        $(this).keydown(function (e) {

           
            //avalon.log($(this).hasClass('hidden'));

            avalon.vmodels.ChangePassword.messagecss = "hidden";
            avalon.vmodels.ChangePassword.message = " ";

            if (e.keyCode === 13) {                

                var ival = $(this).val();
                var placeholder = $(this).attr('placeholder');

                if (!ival) {
                    $(this).focus();
                    avalon.vmodels.ChangePassword.messagecss = "show alert-warning";
                    avalon.vmodels.ChangePassword.message = (dindex + 1) + messages.n2 + placeholder;
                    return;
                }
                //avalon.log('focus');
                if (dindex >= csize) {
                    //$('#checkPasswd').focus();
                    //$input.eq(0).focus();
                    $('#Login').focus();
                } else {                   

                    if (!$input.eq(dindex + 1).hasClass('hidden')) {
                        avalon.vmodels.ChangePassword.messagecss = "show alert-warning";
                        avalon.vmodels.ChangePassword.message = (dindex + 1) + messages.n2 + placeholder;
                        $input.eq(dindex + 1).focus();
                    } else {
                        $('#Login').focus();
                    }

                }
            }
        });
    });
})