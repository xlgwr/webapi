$(function () {
    //$('#checkPasswd').focus();

    $('input[type="text"],input[type="password"]').each(function () {
        var $input = $('input[type="text"],input[type="password"]');

        var dindex = $input.index(this);

        //var ival = this.value;
        var csize = $input.size() - 1;

        $(this).focusin(function (e) {

            var ival = $(this).val();
            var placeholder = $(this).attr('placeholder');   
           // avalon.log(ival);  
            if (!ival) {

                avalon.vmodels.loginController.messagecss = "show alert-warning";
                avalon.vmodels.loginController.message = (dindex + 1) + ".请输入正确内容:" + placeholder;

            } else {
                avalon.log("success.")
                avalon.vmodels.loginController.messagecss = "hidden";
                avalon.vmodels.loginController.message = " ";
            }
        });
        $(this).keydown(function (e) {

            avalon.vmodels.loginController.messagecss = "hidden";
            avalon.vmodels.loginController.message = " ";

            if (e.keyCode === 13) {

                var ival = $(this).val();
                var placeholder = $(this).attr('placeholder');

                if (!ival) {
                    $(this).focus();
                    avalon.vmodels.loginController.messagecss = "show alert-warning";
                    avalon.vmodels.loginController.message = (dindex + 1) + ".请输入正确内容:" + placeholder;
                    return;
                }
                //avalon.log('focus');
                if (dindex >= csize) {
                    //$('#checkPasswd').focus();
                    //$input.eq(0).focus();
                    $('#change').focus();
                } else {

                    avalon.vmodels.loginController.messagecss = "show alert-warning";
                    avalon.vmodels.loginController.message = (dindex + 1) + ".请输入正确内容:" + placeholder;
                    $input.eq(dindex + 1).focus();
                }
            }
        });
    });
})