'use strict';
var domain = 'ccl';
var userid = '';
var userrole = '';

var baseuri = $("#baseUrl").text().toString();
var apiUri = baseuri + 'api/domains/getDomains';
var apiUriDomain = baseuri + 'api/domains/getDomains';
var apiUrionRegister = baseuri + 'api/Account/Register';

var ajaxself = { json: [], error: '' };
var ajaxvalue = [];
avalon.log(baseuri);

//avalon.log("me:" + userid + "," + userrole + "," + ecnnbr);

require(["avalon", 'domReady!'], function (avalon) {
    var login = avalon.define({
        $id: "loginController",
        message: "login",
        messagecss: "info",
        baseUrl: baseuri,
        jsonLogoList: [],
        //duplex      
        domain: domain,
        userid: userid,
        checkPasswd: '',
        newAuditPasswd: '',
        //initjson

        init: function (prefix, currbtn) {
            var data = {
                Email: login.userid,
                Password: login.checkPasswd,
                ConfirmPassword: login.newAuditPasswd
            };
            avalon.log(data);
            $.ajax({
                type: 'POST',
                url: apiUrionRegister,//'/webapiECNDev/api/Account/Register',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).done(function (data) {
                avalon.log("Done!" + data);    
                login.messagecss = "show alert-success";
                login.message = prefix + ": Success.";

            }).fail(showerr);

        },
        onRegister: function (prefix, currbtn) {
            if (!(login.domain && login.userid && login.checkPasswd && login.newAuditPasswd)) {
                avalon.log(login.domain + ',' + login.userid + ',' + login.checkPasswd + ',' + login.newAuditPasswd)
                $('#checkPasswd').focus();
                login.messagecss = "show alert-danger";
                login.message = prefix + ": 请把内容填完整，不能为空";
                return;
            }

            var oldtime = new Date();
            currbtn.disabled = true;
            var oldvalue = currbtn.value;
            currbtn.value = "Load...";

            var data = {
                Email: login.userid,
                Password: login.checkPasswd,
                ConfirmPassword: login.newAuditPasswd
            };
            console.log(data);

            $.ajax({
                type: 'POST',
                url: apiUrionRegister,//'/webapiECNDev/api/Account/Register',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).done(function (data) {
                avalon.log("Done!" + data);   
                login.messagecss = "show alert-success";
                login.message = prefix + ": Success.";

            }).fail(showerr);

            currbtn.disabled = false;
            currbtn.value = oldvalue;
        },
        oncheckPasswd: function (prefix, currbtn) {
            currbtn.disabled = true;
            currbtn.value = "Load...";


            var oldtime = new Date();

            if (!(login.domain && login.userid && login.checkPasswd && login.newAuditPasswd)) {
                avalon.log(login.domain + ',' + login.userid + ',' + login.checkPasswd + ',' + login.newAuditPasswd)
                $('#checkPasswd').focus();
                login.messagecss = "danger";
                login.message = prefix + ",请把内容填完整，不能为空";
                currbtn.disabled = false;
                currbtn.value = "Change";
                return;
            }
            //changeAuditPasswd(string domain, string username, string checkPasswd, string newAuditPasswd, bool initfirst)

            ajaxHelper(apiUri, 'GET', ajaxself).done(function (data) {
                var ajaxmodel = data;

                ajaxself.json = data;

                avalon.log(ajaxself);

                var currtime = new Date();
                var difftime = currtime - oldtime;

                if (ajaxmodel.error) {
                    login.messagecss = "danger";
                } else {
                    //avalon.log("Admin.start.");
                    //avalon.log(ajaxmodel.value);

                    if (!ajaxmodel.value) {

                        login.checkPasswd = '';
                        //$('#checkPasswd').focus();
                        login.messagecss = "danger";
                        login.message = prefix + ",Error: 系统不存在任何记录 . ---->Used:" + difftime + " ms.";

                    } else {
                        login.messagecss = "success";
                        $('#userid').focus();

                        switch (ajaxmodel.value) {
                            case 2:
                                login.message = prefix + ",审核密码，保存成功." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                                break;
                            case -1:
                                login.checkPasswd = '';
                                //$('#checkPasswd').focus();
                                login.messagecss = "danger";
                                login.message = prefix + ",error:登陆密码错误." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                                break;
                            case -2:
                                login.messagecss = "danger";
                                login.message = prefix + ",error update." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                                break;
                            case 3:
                                login.message = prefix + ",success add." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                                break;
                            case -3:
                                login.messagecss = "danger";
                                login.message = prefix + ",error add." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                                break;
                            case -4:
                                login.messagecss = "danger";
                                login.message = prefix + ",system error." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                                break;
                            default:
                                login.messagecss = "danger";
                                login.message = prefix + ",Error: system error." + ajaxmodel.value + " ---->Used:" + difftime + " ms.";
                        }

                    }
                }
                currbtn.disabled = false;
                currbtn.value = "Change";
                //end
            });

            //end
        }
    }, function (vm) {
        avalon.log("加载vm3.");
        avalon.scan();
    });
    //login.$watch('checkPasswd', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#checkPasswd').focus();
    //    }
    //});
    //login.$watch('newAuditPasswd', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#newAuditPasswd').focus();
    //    }
    //});
    login.message = "登  陆";
    login.messagecss = "hidden";
    //avalon.log(avalon.vmodels);
    //end                
    avalon.scan();

    //avalon.log(login.baseUrl)
    //$('#checkPasswd').focus();
    //start code    
    //avalon.log(avalon.vmodels);

});

function ajaxHelper(uri, method, data) {
    avalon.log(uri);

    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: data ? JSON.stringify(data) : null
    });
}
function showerr(err) {
    //{Message:'',responseText:[]}
    var vdata = JSON.parse(err.responseText);
    //ModelState
    console.log(vdata);
    avalon.vmodels.loginController.messagecss = "show alert-danger";
    var errarr = [];
    var icount = 1;
    for (var i in vdata.ModelState) {
        errarr.push(icount + "." + vdata.ModelState[i][0]);
        icount++;
    }
    avalon.vmodels.loginController.message = "Error:<br/>" + errarr.join("<br/><br/>");
}