'use strict';
var domain = 'ccl';
var userid = '';
var userrole = '';
//var tokenKey = 'accessToken';

var baseuri = $("#baseUrl").text().toString();
var apiUri = baseuri + 'api/domains/getDomains';
var apiUriDomain = baseuri + 'api/domains/getDomains';
var apiUrionRegister = baseuri + 'api/Account/Register';
var apiUrionLogin = baseuri + 'Token';

avalon.log(baseuri);

//avalon.log("me:" + userid + "," + userrole + "," + ecnnbr);

require(["avalon", 'domReady!'], function (avalon) {
    var login = avalon.define({
        $id: "loginController",
        message: "login",
        messagecss: "info",
        baseUrl: baseuri,
        //duplex      
        domain: domain,
        userid: userid,
        password: '',
        confirmPassword: '',
        //check validate
        checkbase: function (prefix) {
            login.messagecss = "show alert-info";
            login.message = prefix + ": 正在处理中。。。";

            if (!(login.domain && login.userid && login.password && login.confirmPassword)) {
                avalon.log(login.domain + ',' + login.userid + ',' + login.password + ',' + login.confirmPassword)
                $('#password').focus();
                login.messagecss = "show alert-danger";
                login.message = prefix + ": 请把内容填完整，不能为空";
                return false;
            }
            return true;
        },
        init: function (prefix, currbtn) {
            var data = {
                Email: login.userid,
                Password: login.password,
                ConfirmPassword: login.confirmPassword
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

            if (!login.checkbase(prefix)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            var data = {
                Email: login.userid,
                Password: login.password,
                ConfirmPassword: login.confirmPassword
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,

                //ajax option
                type: 'POST',
                url: apiUrionRegister,//'/webapiECNDev/api/Account/Register',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)

            }).done(function (data) {

                avalon.log("Done!");
                avalon.log(data);

                currbtn.disabled = false;
                login.messagecss = "show alert-success";
                login.message = prefix + ": Success.";

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

            }).fail(showerr);

        },
        onLogin: function (prefix, currbtn) {

            if (!login.checkbase(prefix)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            var data = {
                grant_type: 'password',
                username: login.userid,
                password: login.password
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,

                //ajax option
                type: 'POST',
                url: apiUrionLogin,  //'/Token',                        
                //contentType: 'application/json; charset=utf-8',  
                data: data                // JSON.stringify(data)   

            }).done(function (data) {

                // Cache the access token in session storage.
                sessionStorage.setItem(tokenKey, data.access_token);

                avalon.log("Done!");
                avalon.log(data);

                login.messagecss = "show alert-success";
                login.message = prefix + ": Success.";

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

            }).fail(showerr);

        },
        onpassword: function (prefix, currbtn) {
            currbtn.disabled = true;
            currbtn.value = "Load...";


            var oldtime = new Date();

            if (!(login.domain && login.userid && login.password && login.confirmPassword)) {
                avalon.log(login.domain + ',' + login.userid + ',' + login.password + ',' + login.confirmPassword)
                $('#password').focus();
                login.messagecss = "danger";
                login.message = prefix + ",请把内容填完整，不能为空";
                currbtn.disabled = false;
                currbtn.value = "Change";
                return;
            }
            //changeAuditPasswd(string domain, string username, string password, string confirmPassword, bool initfirst)

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

                        login.password = '';
                        //$('#password').focus();
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
                                login.password = '';
                                //$('#password').focus();
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
    //login.$watch('password', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#password').focus();
    //    }
    //});
    //login.$watch('confirmPassword', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#confirmPassword').focus();
    //    }
    //});
    login.message = "登  陆";
    login.messagecss = "hidden";
    //avalon.log(avalon.vmodels);
    //end                
    avalon.scan();

    //avalon.log(login.baseUrl)
    //$('#password').focus();
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

    avalon.log(this);
    avalon.log(err);
                      
    $('#password').focus();

    avalon.vmodels.loginController.messagecss = "show alert-danger";
    this.currbtn.disabled = false;
    this.currbtn.className = 'btn btn-danger';

    switch (err.status) {
        case 404:
            avalon.vmodels.loginController.message = "this URL:" + this.url + " was not found.Please check that.";
            return;
            break;
        default:

    }

    //{Message:'',responseText:[],responseJSON}
    var vdata = err.responseJSON//JSON.parse(err.responseText);

    avalon.log(vdata);

    //{error:'',error_description:''}
    if (vdata.error) {
        avalon.vmodels.loginController.message = vdata.error + "<br/>" + vdata.error_description;
    }
    //{Message:'',ModelState:[]}
    if (vdata.Message) {
        //ModelState              
        var errarr = [];
        var icount = 1;
        for (var i in vdata.ModelState) {
            errarr.push(icount + "." + vdata.ModelState[i][0]);
            icount++;
        }
        avalon.vmodels.loginController.message = vdata.Message + "<br/>" + errarr.join("<br/><br/>");
    }


}