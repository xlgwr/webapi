'use strict';
require(["avalon", 'domReady!'], function (avalon) {
    var about = avalon.define({
        $id: "aboutController",
        message: "About",
        messagecss: "info"
    }, function (vm) {
        avalon.log("加载vm3.");
        avalon.scan();
    });
    //about.$watch('checkPasswd', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#checkPasswd').focus();
    //    }
    //});
    //about.$watch('newAuditPasswd', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#newAuditPasswd').focus();
    //    }
    //});
    about.message = "AboutAboutAboutAboutAbout";
    //avalon.log(avalon.vmodels);
    //end                
    avalon.scan();              
    //start code    
    avalon.log(avalon.vmodels);

});