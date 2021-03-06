﻿require(["avalon", 'domReady!'], function (avalon) {
    'use strict';
    //init 
    var currrooturl = $("#baseBody").attr('rooturl');

    avalon.log("avalon:8");
    avalon.log(top.loginApi);

    //start define
    var login = avalon.define({
        $id: "loginController",
        message: "login",
        messagecss: "info",
        messageErr: top.users.rd_msg,
        messageErrcss: 'hidden',
        iloginApi: top.loginApi,
        //is register
        cssRegister: 'hidden',
        cssRegisterbtn: 'hidden',
        cssonLogout: 'hidden',
        //title
        tlogin: top.tlogin,
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
            login.messagecss = "show alert-info";
            login.message = prefix + messages.n4;

            var tmpflag = true;

            if (!(login.domain && login.userid && login.password)) {

                tmpflag = false;
            }
            if (flagRegister) {
                if (!login.confirmPassword) {
                    tmpflag = false;
                }
            }

            if (!tmpflag) {
                avalon.log(login.domain + ',' + login.userid + ',' + login.password + ',' + login.confirmPassword)
                $('#password').focus();
                login.messagecss = "show alert-danger";
                login.message = prefix + messages.n3;
                return tmpflag;
            }

            return tmpflag;
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
                url: login.iloginApi.apiUrionRegister,//'/webapiECNDev/api/Account/Register',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).done(function (data) {
                avalon.log("Done!" + data);
                login.messagecss = "show alert-success";
                login.message = prefix + ": Success.";

            }).fail(showerr);

        },
        initDomain: function (prefix) {

            login.messagecss = "show alert-info";
            login.message = prefix + messages.n4;
            var tmpurl = login.iloginApi.apiUriDomain;
            $.ajax({
                type: 'GET',
                url: tmpurl,
                //headers: top.auth.headers,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8'
            }).complete(function () {
                $("#" + login.$id).removeClass('hidden');
            }).done(function (data) {

                login.messagecss = "show alert-success";
                login.message = prefix + messages.n7;
                avalon.log(data);
                login.arrDomains = data;

                //init domain maildomain
                if (login.domain) {
                    for (var i = 0; i < login.arrDomains.length; i++) {
                        var item = login.arrDomains[i];
                        //avalon.log(item);
                        //avalon.log(item.displayname); 
                        if (item.displayname === login.domain) {

                            login.mailDomain = item.mailDomain;
                            //avalon.log("true:"+login.mailDomain)
                            $('#userid').focus();
                            break;
                        } else {
                            login.mailDomain = '';
                            $('#domain').focus();
                        }
                    }

                } else {
                    if (login.arrDomains[0]) {
                        login.domain = login.arrDomains[0].displayname;
                        $('#domain').focus();
                    }
                }
                //self.result(data);              

            }).fail(showerr);
        },
        onRegister: function (prefix, currbtn) {

            if (!login.checkbase(prefix, true)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            //check userid is't email
            var tmpEmail = login.userid;
            if (!top.validateMe.email(login.userid)) {
                tmpEmail = login.userid + '@' + mailApi.mailDomain;
                if (login.mailDomain) {
                    tmpEmail = login.userid + '@' + login.mailDomain;
                }
            }

            var data = {
                Email: tmpEmail,
                Password: login.password,
                ConfirmPassword: login.confirmPassword
            };

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,

                //ajax option
                type: 'POST',
                url:login.iloginApi.apiUrionRegister,
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

            if (!login.checkbase(prefix, false)) { return; }

            var oldtime = new Date();
            currbtn.disabled = true;

            var tmpEmail = login.userid;
            if (!top.validateMe.email(login.userid)) {
                tmpEmail = login.userid + '@' + mailApi.mailDomain;
                if (login.mailDomain) {
                    tmpEmail = login.userid + '@' + login.mailDomain;
                }
            }

            var data = {
                grant_type: 'password',
                username: tmpEmail,
                password: login.password
            };
            var savelogdata = {
                domain: login.domain,
                UserName: tmpEmail,
                types: login.tlogin.title,
                clienturl: location.href
            }

            avalon.log(data);

            $.ajax({
                //usedifine
                currbtn: currbtn,

                //ajax option
                type: 'POST',
                url: login.iloginApi.apiUrionLogin,
                data: data

            }).done(function (data) {

                // Cache the access token in session storage.
                //sessionStorage.setItem(top.auth.tokenKey, data.access_token);


                avalon.log("Done!");
                avalon.log(data);


                $.ajax({
                    //usedifine
                    sdata: data,
                    currbtn: currbtn,
                    //ajax option
                    type: 'POST',
                    url: login.iloginApi.apiUrionLogs,
                    data: savelogdata
                }).done(function (sdata) {
                    avalon.log(sdata);
                    avalon.log("save log ok.");

                    login.messagecss = "show alert-success";
                    login.message = prefix + ": Success.";

                    this.currbtn.disabled = false;
                    this.currbtn.className = 'btn btn-success';

                    if (top.loginApi.redirectUrl) {
                        login.message = prefix + ": Success.正在转向：" + decodeURI(top.loginApi.redirectUrl);
                        top.location.href = encodeURI(top.loginApi.redirectUrl + "?domain=" + login.domain + "&userid=" + login.userid) + "&tokenkey=" + this.sdata.access_token;
                    } else {
                        login.cssonLogout = 'show';
                    }
                }).fail(showerr);



            }).fail(showerr);

        },
        onLogout: function (prefix, currbtn) {
            var oldtime = new Date();
            currbtn.disabled = true;

            // Cache the access token in session storage.
            sessionStorage.removeItem(top.auth.tokenKey);

            avalon.log("Done!");

            login.messagecss = "show alert-success";
            login.message = prefix + ": Success.";

            currbtn.disabled = false;
            // currbtn.className = 'btn btn-success';
            login.password = '';
            $('#userid').focus();
            login.cssonLogout = 'hidden';

        }

    }, function (vm) {
        avalon.log("加载vm3.");
        avalon.scan();
    });
    login.$watch('domain', function (value, oldValue) {
        //avalon.log(value);   
        if (value) {
            for (var i = 0; i < login.arrDomains.length; i++) {
                var item = login.arrDomains[i];
                //avalon.log(item);
                //avalon.log(item.displayname); 
                if (item.displayname === value) {
                    login.mailDomain = item.mailDomain;
                    //avalon.log("true:"+login.mailDomain)
                    break;
                } else {
                    login.mailDomain = '';
                }
            }
        }
    });
    //login.$watch('confirmPassword', function (a, b) {
    //    avalon.log(a + "," + b);
    //    if (a) {
    //        $('#confirmPassword').focus();
    //    }
    //});
    login.message = login.tlogin.title;
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
    login.initDomain("Init domain");



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

        if (!err.responseJSON) {
            avalon.vmodels.loginController.cssRegister = 'show';
            avalon.vmodels.loginController.cssRegisterbtn = 'show';
            avalon.log(err);
            return;
        }
        //{Message:'',responseText:[],responseJSON}
        var vdata = err.responseJSON//JSON.parse(err.responseText);

        avalon.log(vdata);

        //{error:'',error_description:''}
        if (vdata.error) {
            avalon.vmodels.loginController.cssRegister = 'show';
            avalon.vmodels.loginController.cssRegisterbtn = 'show';
            avalon.vmodels.loginController.message = vdata.error + "<br/>" + "1. " + vdata.error_description + "<br/>" + "2. " + top.messages.n6;
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
            avalon.vmodels.loginController.message = vdata.Message + "<br/>" + errarr.join("<br/><br/>");
        }


    }
});