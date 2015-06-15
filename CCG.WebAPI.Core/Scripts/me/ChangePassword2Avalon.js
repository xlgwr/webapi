require(["avalon", 'domReady!'], function (avalon) {
    'use strict';
    //init 
    rooturl = $("#baseBody").attr('rooturl');
    loginApi.rooturl = rooturl;

    avalon.log("avalon:8");
    avalon.log(loginApi);
    avalon.log(top.auth);

    //start define
    var ChangePassword = avalon.define({
        $id: "ChangePassword",
        message: "ChangePassword",
        messagecss: "info",
        messageErr: top.users.rd_msg,
        messageErrcss: 'hidden',
        rooturl: rooturl,
        iloginApi: loginApi,
        //is register
        cssRegister: 'show', 
        cssRegisterbtn: 'hidden',
        cssonLogout: 'hidden',
        //title
        tlogin:top.tclogin,
        //ms-duplex      
        domain: top.users.domain,
        userid: top.users.userid,
        password: '',
        confirmPassword: '',
        //watch      
        mailDomain: '',
        //ms-repeat
        //domains{Id: 5,displayname: "CCG",domain: "CCG.NET",isused: 0,mailDomain: "cclmotors.com",remark: "CCG.NET"}
        arrDomains: {},
        //check validate
        checkbase: function (prefix, flagRegister) {
            ChangePassword.messagecss = "show alert-info";
            ChangePassword.message = prefix + messages.n4;

            var tmpflag = true;

            if (!(ChangePassword.domain && ChangePassword.userid && ChangePassword.password)) {

                tmpflag = false;
            }
            if (flagRegister) {
                if (!ChangePassword.confirmPassword) {
                    tmpflag = false;
                }
            }

            if (!tmpflag) {
                avalon.log(ChangePassword.domain + ',' + ChangePassword.userid + ',' + ChangePassword.password + ',' + ChangePassword.confirmPassword)
                $('#password').focus();
                ChangePassword.messagecss = "show alert-danger";
                ChangePassword.message = prefix + messages.n3;
                return tmpflag;
            }

            return tmpflag;
        },
        initDomain: function (prefix) {

            ChangePassword.messagecss = "show alert-info";
            ChangePassword.message = prefix + messages.n4;
            var tmpurl = rooturl + ChangePassword.iloginApi.apiUriDomain;
            $.ajax({
                type: 'GET',
                url: tmpurl,
                headers: top.auth.headers
            }).complete(function () {
                $("#"+ChangePassword.$id).removeClass('hidden');
            }).done(function (data) {

                ChangePassword.messagecss = "show alert-success";
                ChangePassword.message = prefix + messages.n7;
                //avalon.log(data);
                ChangePassword.arrDomains = data;

                //init domain maildomain
                if (ChangePassword.domain) {
                    for (var i = 0; i < ChangePassword.arrDomains.length; i++) {
                        var item = ChangePassword.arrDomains[i];
                        //avalon.log(item);
                        //avalon.log(item.displayname); 
                        if (item.displayname === ChangePassword.domain) {

                            ChangePassword.mailDomain = item.mailDomain;
                            //avalon.log("true:"+ChangePassword.mailDomain)
                            $('#password').focus();
                            break;
                        } else {
                            ChangePassword.mailDomain = '';
                            $('#domain').focus();
                        }
                    }

                } else {
                    if (ChangePassword.arrDomains[0]) {
                        ChangePassword.domain = ChangePassword.arrDomains[0].displayname;
                        $('#domain').focus();
                    }
                }
                //self.result(data);              

            }).fail(showerr);
        },
        onRegister: function (prefix, currbtn) {

            if (!ChangePassword.checkbase(prefix, true)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            //check userid is't email
            var tmpEmail = ChangePassword.userid;
            if (!top.validateMe.email(ChangePassword.userid)) {
                tmpEmail = ChangePassword.userid + '@' + mailApi.mailDomain;
                if (ChangePassword.mailDomain) {
                    tmpEmail = ChangePassword.userid + '@' + ChangePassword.mailDomain;
                }
            }

            var data = {
                Email: tmpEmail,
                Password: ChangePassword.password,
                ConfirmPassword: ChangePassword.confirmPassword
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,

                //ajax option
                type: 'POST',
                url: rooturl + ChangePassword.iloginApi.apiUrionRegister,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)

            }).done(function (data) {

                avalon.log("Done!");
                avalon.log(data);

                currbtn.disabled = false;
                ChangePassword.messagecss = "show alert-success";
                ChangePassword.message = prefix + ": Success.";

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

            }).fail(showerr);

        },
        onLogin: function (prefix, currbtn) {

            if (!ChangePassword.checkbase(prefix, true)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            var tmpEmail = ChangePassword.userid;
            if (!top.validateMe.email(ChangePassword.userid)) {
                tmpEmail = ChangePassword.userid + '@' + mailApi.mailDomain;
                if (ChangePassword.mailDomain) {
                    tmpEmail = ChangePassword.userid + '@' + ChangePassword.mailDomain;
                }
            }
            var data = {
                OldPassword: ChangePassword.password,
                NewPassword: ChangePassword.confirmPassword,
                ConfirmPassword: ChangePassword.confirmPassword
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn, 
                //ajax option
                type: 'POST',
                url: rooturl + ChangePassword.iloginApi.apiUrionChangePassword,
                data: data,
                headers: top.auth.headers

            }).done(function (data) {

                // Cache the access token in session storage.
                //sessionStorage.setItem(top.auth.tokenKey, data.access_token);


                avalon.log("Done!");
                avalon.log(data);

                ChangePassword.messagecss = "show alert-success";
                ChangePassword.message = prefix + ": Success." + ",New Password:" + ChangePassword.confirmPassword

                ChangePassword.password = '';
                ChangePassword.confirmPassword = '';

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

                avalon.log(loginApi);

                if (loginApi.redirectUrl) {
                   // ChangePassword.message = prefix + ": Success.正在转向：" + decodeURI(loginApi.redirectUrl);
                   // top.location.href = encodeURI(loginApi.redirectUrl + "?domain=" + ChangePassword.domain + "&userid=" + ChangePassword.userid) + "&tokenkey=" + data.access_token;
                } else {
                    //ChangePassword.cssonLogout = 'show';
                }

            }).fail(showerr);

        },
        onLogout: function (prefix, currbtn) {
            var oldtime = new Date();
            currbtn.disabled = true;

            // Cache the access token in session storage.
            sessionStorage.removeItem(top.auth.tokenKey);

            avalon.log("Done!");

            ChangePassword.messagecss = "show alert-success";
            ChangePassword.message = prefix + ": Success.";

            currbtn.disabled = false;
            // currbtn.className = 'btn btn-success';
            ChangePassword.password = '';
            $('#password').focus();
            ChangePassword.cssonLogout = 'hidden';

        }

    }, function (vm) {
        avalon.log("加载vm3.");
        avalon.scan();
    });
    ChangePassword.$watch('domain', function (value, oldValue) {
        //avalon.log(value);   
        if (value) {
            for (var i = 0; i < ChangePassword.arrDomains.length; i++) {
                var item = ChangePassword.arrDomains[i];
                //avalon.log(item);
                //avalon.log(item.displayname); 
                if (item.displayname === value) {
                    ChangePassword.mailDomain = item.mailDomain;
                    //avalon.log("true:"+ChangePassword.mailDomain)
                    break;
                } else {
                    ChangePassword.mailDomain = '';
                }
            }
        }
    });
    //ChangePassword.$watch('confirmPassword', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#confirmPassword').focus();
    //    }
    //});
    ChangePassword.message = ChangePassword.tlogin.title;
    ChangePassword.messagecss = "hidden";
    //avalon.log(avalon.vmodels);
    //end           
    if (ChangePassword.messageErr) {
        ChangePassword.messageErrcss = 'show alert-danger';
    }

    avalon.scan();

    //avalon.log(ChangePassword.baseUrl)
    //$('#password').focus();
    //start code    
    //avalon.log(avalon.vmodels);
    ChangePassword.initDomain("Init domain");


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

    avalon.vmodels.ChangePassword.messagecss = "show alert-danger";
    this.currbtn.disabled = false;
    this.currbtn.className = 'btn btn-danger';

    switch (err.status) {
        case 404:
            avalon.vmodels.ChangePassword.message = "this URL:" + this.url + " was not found.Please check that.";
            return;
            break;
        default:

    }

    if (!err.responseJSON) {
        avalon.vmodels.ChangePassword.cssRegister = 'show'; 
        avalon.vmodels.ChangePassword.cssRegisterbtn = 'show';
        avalon.log(err);
        return;
    }
    //{Message:'',responseText:[],responseJSON}
    var vdata = err.responseJSON//JSON.parse(err.responseText);

    avalon.log(vdata);

    //{error:'',error_description:''}
    if (vdata.error) {
        avalon.vmodels.ChangePassword.cssRegister = 'show'; 
        avalon.vmodels.ChangePassword.cssRegisterbtn = 'show';
        avalon.vmodels.ChangePassword.message = vdata.error + "<br/>" + "1. " + vdata.error_description + "<br/>" + "2. " + top.messages.n6;
        $('#password').focus();
        return;
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
        avalon.vmodels.ChangePassword.message = vdata.Message + "<br/>" + errarr.join("<br/><br/>");
    }


}