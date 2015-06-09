require(["avalon", 'domReady!'], function (avalon) {
    'use strict';
    //init 
    rooturl = $("#baseBody").attr('rooturl');
    loginApi.rooturl = rooturl;

    avalon.log("avalon:8");
    avalon.log(loginApi);

    //start define
    var login = avalon.define({
        $id: "loginController",
        message: "login",
        messagecss: "info",
        messageErr: top.users.rd_msg,
        messageErrcss: 'hidden',
        rooturl: rooturl,
        iloginApi: loginApi,
        //duplex      
        domain: top.users.domain,
        userid: top.users.userid,
        password: '',
        confirmPassword: '',
        //check validate
        checkbase: function (prefix) {
            login.messagecss = "show alert-info";
            login.message = prefix + messages.n4;

            if (!(login.domain && login.userid && login.password && login.confirmPassword)) {
                avalon.log(login.domain + ',' + login.userid + ',' + login.password + ',' + login.confirmPassword)
                $('#password').focus();
                login.messagecss = "show alert-danger";
                login.message = prefix + messages.n3;
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
                url: rooturl + login.iloginApi.apiUrionRegister,//'/webapiECNDev/api/Account/Register',
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
                url: rooturl + login.iloginApi.apiUrionRegister,
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
                url: rooturl + login.iloginApi.apiUrionLogin,
                data: data

            }).done(function (data) {

                // Cache the access token in session storage.
                //sessionStorage.setItem(tokenKey, data.access_token);


                avalon.log("Done!");
                avalon.log(data);

                login.messagecss = "show alert-success";
                login.message = prefix + ": Success.";

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

                if (loginApi.redirectUrl) {
                    login.message = prefix + ": Success.正在转向：" + decodeURI(loginApi.redirectUrl);
                    top.location.href = encodeURI(loginApi.redirectUrl + "?domain=" + login.domain + "&userid=" + login.userid) + "&tokenkey=" + data.access_token;
                }

            }).fail(showerr);

        },
        onLogout: function (prefix, currbtn) {
            var oldtime = new Date();
            currbtn.disabled = true;

            // Cache the access token in session storage.
            sessionStorage.removeItem(tokenKey);

            avalon.log("Done!");

            login.messagecss = "show alert-success";
            login.message = prefix + ": Success.";

            currbtn.disabled = false;
            currbtn.className = 'btn btn-success';
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
    if (login.messageErr) {
        login.messageErrcss = 'show alert-danger';
    }

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

    $('#userid').focus();

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