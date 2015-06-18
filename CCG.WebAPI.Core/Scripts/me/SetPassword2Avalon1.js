require(["avalon", 'domReady!'], function (avalon) {
    'use strict';
    //init 
    rooturl = $("#baseBody").attr('rooturl');
    loginApi.rooturl = rooturl;

    avalon.log("avalon:8");
    avalon.log(loginApi);
    avalon.log(top.auth);

    //start define
    var SetPassword = avalon.define({
        $id: "SetPassword",
        message: "SetPassword",
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
        tlogin: top.tsplogin,
        //ms-duplex      
        domain: top.users.domain,
        userid: top.users.userid,
        password: '',
        confirmPassword: '',
        //watch      
        mailDomain: '',
        //ms-repeat
        //domains{Id: 5,displayname: "CCG",domain: "CCG.NET",isused: 0,mailDomain: "cclmotors.com",remark: "CCG.NET"}
        arrDomains: [],
        //check validate
        checkbase: function (prefix, flagRegister) {
            SetPassword.messagecss = "show alert-info";
            SetPassword.message = prefix + messages.n4;

            var tmpflag = true;

            if (!(SetPassword.domain && SetPassword.userid && SetPassword.password)) {

                tmpflag = false;
            }
            if (flagRegister) {
                if (!SetPassword.confirmPassword) {
                    tmpflag = false;
                }
            }

            if (!tmpflag) {
                avalon.log(SetPassword.domain + ',' + SetPassword.userid + ',' + SetPassword.password + ',' + SetPassword.confirmPassword)
                $('#password').focus();
                SetPassword.messagecss = "show alert-danger";
                SetPassword.message = prefix + messages.n3;
                return tmpflag;
            }

            return tmpflag;
        },
        initDomain: function (prefix) {

            SetPassword.messagecss = "show alert-info";
            SetPassword.message = prefix + messages.n4;
            var tmpurl = rooturl + SetPassword.iloginApi.apiUriDomain;
            $.ajax({
                type: 'GET',
                url: tmpurl,
                headers: top.auth.headers
            }).complete(function () {
                $("#" + SetPassword.$id).removeClass('hidden');
            }).done(function (data) {

                SetPassword.messagecss = "show alert-success";
                SetPassword.message = prefix + messages.n7;
                //avalon.log(data);
                SetPassword.arrDomains = data;

                //init domain maildomain
                if (SetPassword.domain) {
                    for (var i = 0; i < SetPassword.arrDomains.length; i++) {
                        var item = SetPassword.arrDomains[i];
                        //avalon.log(item);
                        //avalon.log(item.displayname); 
                        if (item.displayname === SetPassword.domain) {

                            SetPassword.mailDomain = item.mailDomain;
                            //avalon.log("true:"+SetPassword.mailDomain)
                            //$('#password').focus();
                            $('#userid').focus();
                            break;
                        } else {
                            SetPassword.mailDomain = '';
                            $('#domain').focus();
                        }
                    }

                } else {
                    if (SetPassword.arrDomains[0]) {
                        SetPassword.domain = SetPassword.arrDomains[0].displayname;
                        $('#domain').focus();
                    }
                }
                //self.result(data);              

            }).fail(showerr);
        },
        onRegister: function (prefix, currbtn) {

            if (!SetPassword.checkbase(prefix, true)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            //check userid is't email
            var tmpEmail = SetPassword.userid;
            if (!top.validateMe.email(SetPassword.userid)) {
                tmpEmail = SetPassword.userid + '@' + mailApi.mailDomain;
                if (SetPassword.mailDomain) {
                    tmpEmail = SetPassword.userid + '@' + SetPassword.mailDomain;
                }
            }

            var data = {
                Email: tmpEmail,
                Password: SetPassword.password,
                ConfirmPassword: SetPassword.confirmPassword
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,

                //ajax option
                type: 'POST',
                url: rooturl + SetPassword.iloginApi.apiUrionRegister,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)

            }).done(function (data) {

                avalon.log("Done!");
                avalon.log(data);

                currbtn.disabled = false;
                SetPassword.messagecss = "show alert-success";
                SetPassword.message = prefix + ": Success.";

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

            }).fail(showerr);

        },
        onLogin: function (prefix, currbtn) {

            if (!SetPassword.checkbase(prefix, true)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            var tmpEmail = SetPassword.userid;
            if (!top.validateMe.email(SetPassword.userid)) {
                tmpEmail = SetPassword.userid + '@' + mailApi.mailDomain;
                if (SetPassword.mailDomain) {
                    tmpEmail = SetPassword.userid + '@' + SetPassword.mailDomain;
                }
            }
            var data = {
                //OldPassword: SetPassword.password,
                Email: tmpEmail,
                NewPassword: SetPassword.confirmPassword,
                ConfirmPassword: SetPassword.confirmPassword
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,
                //ajax option
                type: 'POST',
                url: rooturl + SetPassword.iloginApi.apiUrionSetPassword,
                data: data,
                headers: top.auth.headers

            }).done(function (data) {

                // Cache the access token in session storage.
                //sessionStorage.setItem(top.auth.tokenKey, data.access_token);


                avalon.log("Done!");
                avalon.log(data);

                $('#password').focus();

                SetPassword.messagecss = "show alert-success";
                SetPassword.message = prefix + SetPassword.tlogin.notice + SetPassword.confirmPassword

                SetPassword.password = '';
                SetPassword.confirmPassword = '';

                this.currbtn.disabled = false;
                this.currbtn.className = 'btn btn-success';

                avalon.log(loginApi);

                if (loginApi.redirectUrl) {
                    // SetPassword.message = prefix + ": Success.正在转向：" + decodeURI(loginApi.redirectUrl);
                    // top.location.href = encodeURI(loginApi.redirectUrl + "?domain=" + SetPassword.domain + "&userid=" + SetPassword.userid) + "&tokenkey=" + data.access_token;
                } else {
                    //SetPassword.cssonLogout = 'show';
                }

            }).fail(showerr);

        },
        onLogout: function (prefix, currbtn) {
            var oldtime = new Date();
            currbtn.disabled = true;

            // Cache the access token in session storage.
            sessionStorage.removeItem(top.auth.tokenKey);

            avalon.log("Done!");

            SetPassword.messagecss = "show alert-success";
            SetPassword.message = prefix + ": Success.";

            currbtn.disabled = false;
            // currbtn.className = 'btn btn-success';
            SetPassword.password = '';
            $('#password').focus();
            SetPassword.cssonLogout = 'hidden';

        }

    }, function (vm) {
        avalon.log("加载vm3.");
        avalon.scan();
    });
    SetPassword.$watch('domain', function (value, oldValue) {
        //avalon.log(value);   
        if (value) {
            for (var i = 0; i < SetPassword.arrDomains.length; i++) {
                var item = SetPassword.arrDomains[i];
                //avalon.log(item);
                //avalon.log(item.displayname); 
                if (item.displayname === value) {
                    SetPassword.mailDomain = item.mailDomain;
                    //avalon.log("true:"+SetPassword.mailDomain)
                    break;
                } else {
                    SetPassword.mailDomain = '';
                }
            }
        }
    });
    //SetPassword.$watch('confirmPassword', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#confirmPassword').focus();
    //    }
    //});
    SetPassword.message = SetPassword.tlogin.title;
    SetPassword.messagecss = "hidden";
    //avalon.log(avalon.vmodels);
    //end           
    if (SetPassword.messageErr) {
        SetPassword.messageErrcss = 'show alert-danger';
    }

    avalon.scan();

    //avalon.log(SetPassword.baseUrl)
    //$('#password').focus();
    //start code    
    //avalon.log(avalon.vmodels);
    SetPassword.initDomain("Init domain");

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

        avalon.vmodels.SetPassword.messagecss = "show alert-danger";
        this.currbtn.disabled = false;
        this.currbtn.className = 'btn btn-danger';

        switch (err.status) {
            case 404:
                avalon.vmodels.SetPassword.message = "this URL:" + this.url + " was not found.Please check that.";
                return;
                break;
            default:

        }

        if (!err.responseJSON) {
            avalon.vmodels.SetPassword.cssRegister = 'show';
            avalon.vmodels.SetPassword.cssRegisterbtn = 'show';
            avalon.log(err);
            return;
        }
        //{Message:'',responseText:[],responseJSON}
        var vdata = err.responseJSON//JSON.parse(err.responseText);

        avalon.log(vdata);

        //{error:'',error_description:''}
        if (vdata.error) {
            avalon.vmodels.SetPassword.cssRegister = 'show';
            avalon.vmodels.SetPassword.cssRegisterbtn = 'show';
            avalon.vmodels.SetPassword.message = vdata.error + "<br/>" + "1. " + vdata.error_description + "<br/>" + "2. " + top.messages.n6;
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
            avalon.vmodels.SetPassword.message = vdata.Message + "<br/>" + errarr.join("<br/><br/>");
        }


    }
});

