'use strict';
var domain = top.users.domain;
var userid = top.users.userid;
var userrole = top.users.userrole;
var ecnnbr = top.ecnnbrs.ecnnbr;
var now = new Date();
var jsonLogoListG = [];

avalon.log("me:" + userid + "," + userrole + "," + ecnnbr);
require(["avalon", 'domReady!'], function (avalon) {
    var auditMain = avalon.define({
        $id: "auditMain",
        message: "",
        messagecss: "info",
        jsonLogoList: [],
        //duxpfor       
        domain: domain,
        userid: userid,
        checkPasswd: '',
        newAuditPasswd: '',

        oncheckPasswd: function (prefix, currbtn) {
            currbtn.disabled = true;

            var oldtime = new Date();

            if (!(auditMain.domain && auditMain.userid && auditMain.checkPasswd && auditMain.newAuditPasswd)) {
                avalon.log(auditMain.domain + ',' + auditMain.userid + ',' + auditMain.checkPasswd + ',' + auditMain.newAuditPasswd)
                auditMain.messagecss = "danger";
                auditMain.message = prefix + ",请把内容填完整，不能为空";
                $('#checkPasswd').focus();
                currbtn.disabled = false;
                return;
            }
            //changeAuditPasswd(string domain, string username, string checkPasswd, string newAuditPasswd, bool initfirst)

            var ajaxmodel = ECNweb.AppCode.AjaxForAudit.changeAuditPasswd(auditMain.domain.trim(), auditMain.userid.trim(), auditMain.checkPasswd, auditMain.newAuditPasswd, false);

            var currtime = new Date();
            var difftime = currtime - oldtime;

            if (ajaxmodel.error) {
                auditMain.messagecss = "danger";
            } else {
                //avalon.log("Admin.start.");
                //avalon.log(ajaxmodel.value);

                if (!ajaxmodel.value) {
                    auditMain.messagecss = "danger";
                    auditMain.message = prefix + ",Error: 系统不存在任何记录 . ---->Used:" + difftime + " ms.";
                } else {
                    auditMain.messagecss = "success";
                    $('#userid').focus();

                    switch (ajaxmodel.value) {
                        case 2:
                            auditMain.message = prefix + ",审核密码，保存成功." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                            break;
                        case -1:
                            auditMain.messagecss = "danger";
                            auditMain.checkPasswd = '';  
                            $('#checkPasswd').focus();
                            auditMain.message = prefix + ",error:登陆密码错误." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                            break;
                        case -2:
                            auditMain.messagecss = "danger";
                            auditMain.message = prefix + ",error update." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                            break;
                        case 3:
                            auditMain.message = prefix + ",success add." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                            break;
                        case -3:
                            auditMain.messagecss = "danger";
                            auditMain.message = prefix + ",error add." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                            break;
                        case -4:
                            auditMain.messagecss = "danger";
                            auditMain.message = prefix + ",system error." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                            break;
                        default:
                            auditMain.messagecss = "danger";
                            auditMain.message = prefix + ",Error: system error." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                    }

                }
            }
            currbtn.disabled = false;
            //end
        }
    }, function (vm) {
        avalon.log("加载vm3.");
        avalon.scan();
    });
    //auditMain.$watch('checkPasswd', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#checkPasswd').focus();
    //    }
    //});
    //auditMain.$watch('newAuditPasswd', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#newAuditPasswd').focus();
    //    }
    //});
    auditMain.message = "个人中心-审核密码-修改（初始化为登陆密码）";
    //avalon.log(avalon.vmodels);
    //end                
    avalon.scan();
    $('#checkPasswd').focus();
    //start code    


});