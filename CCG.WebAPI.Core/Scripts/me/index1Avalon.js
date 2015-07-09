rooturl = $("#baseBody").attr('rooturl');
loginApi.rooturl = rooturl;
top.menusApi.rooturl = rooturl;

require(["avalon", 'domReady!'], function (avalon) {

    var gettokenKey = GetQueryString('tokenkey');
    if (gettokenKey) {
        sessionStorage.setItem(top.auth.tokenKey, gettokenKey);
        top.auth.headers.Authorization = 'Bearer ' + gettokenKey;
    }
    //avalon     
    var indexvm = avalon.define({
        $id: "indexvm",
        message: '',
        showbody: 'hidden',
        is_ADMIN: false,
        jsonlidata: [],
        //language
        lang: { title: top.linksTitleIndex, tlogin: top.tlogin, tclogin: top.tclogin },
        //ms-duplex
        user: top.users,
        //repeat
        //Id: 8,displayname: "index",funcType: "Manage",isused: 1,mainUrl: "Manage/index",menutype: "public",orderId: 10,remark: null,secondUrl: ""
        arrmenus: {},
        //method
        addtab: function (tabid, text, url) {
            f_addTab(tabid, text, url);
        },
        initli: function () {
            avalon.log('index:24');
            avalon.log(top.auth.headers);
            avalon.log(top.auth.headers.Authorization);
            //init userinfo
            $.ajax({
                type: 'GET',
                url: top.auth.apiGetvUserInfoRoles,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                headers: top.auth.headers
            }).done(function (data) {
                avalon.log("avalonLog:ajaxInitLi.27");
                //apiGetvUserInfoRoles
                //Dept:null,Email:"admin@cclmotors.com",HasRegistered:true,LoginProvider:null,RoleNames:["admin"],UserName:"admin@cclmotors.com"
                avalon.log(data);

                //top.users.userid = data.Email;
                indexvm.user.userid = data.Email;
                indexvm.user.username = data.UserName;
                indexvm.user.dept = data.Dept;
                indexvm.user.userrole = data.RoleNames;

                //start other code   
                avalon.log(top.users);

                //init menudata
                var arrMenudata = ['public'];
                arrMenudata.push(indexvm.user.domain);
                var arrdata = { rolename: arrMenudata.concat(indexvm.user.userrole) };


                setTimeout(function () {
                    avalon.log('getmenus:63');
                    avalon.log(arrdata);
                    avalon.log(top.auth.headers);
                    avalon.log(top.menusApi);
                    $.ajax({
                        type: 'POST',
                        url: encodeURI(rooturl + top.menusApi.apiUri),
                        data: arrdata,
                        headers: top.auth.headers
                    }).done(function (data) {
                        avalon.log(data);

                        for (var i in data) {

                        }

                        indexvm.arrmenus = data;


                        /*************************************************/
                        //init ui

                        initLigerUi();

                        /**************************************************/
                    }).fail(showerrIndex);
                }, 10);


            }).fail(showerrIndex);
            //end     

        },
        onLogout: function (prefix, currbtn) {

            // Cache the access token in session storage.
            sessionStorage.removeItem(top.auth.tokenKey);

            avalon.log("onLogout Done!");

            top.location.href = top.auth.setLoginhref;
        }
    }, function (vm) {
        avalon.log("vmindex.")
    });

    avalon.scan();

    //init from avalon ******************************************************
    avalon.vmodels.indexvm.initli();
    avalon.log(avalon.vmodels.indexvm.user)
    //end *******************************************************************

    avalon.log("avalon: role:" + indexvm.user.userrole);
    if (indexvm.user.userrole === 'admin') {
        indexvm.is_ADMIN = true;
    }
    function showerrIndex(err) {

        //avalon.log(this);
        avalon.log(err);

        switch (err.status) {
            case 0:
                return;
                break;
            case 401:
                avalon.log('index err 401: 112');
                avalon.log(messages.n5);
                //error auth
                top.location.href = encodeURI(top.auth.setLoginhref + "&msg=" + messages.n5);
                break;
            case 404:
                avalon.log("this URL:" + this.url + " was not found.Please check that.");
                return;
                break;
            default:

        }
        if (!err.responseJSON) {
            return;
        }
        //{Message:'',responseText:[],responseJSON}
        var vdata = err.responseJSON//JSON.parse(err.responseText);

        //avalon.log(vdata);

        //{error:'',error_description:''}
        if (vdata.error) {
            avalon.log(vdata.error + "<br/>" + vdata.error_description);
        }
        //{Message:'',ModelState:[]}
        if (vdata.Message) {
            //ModelState              
            var errarr = [];
            var icount = 1;

            if (vdata.ModelState) {
                for (var i in vdata.ModelState) {
                    errarr.push(icount + "." + vdata.ModelState[i][0]);
                    icount++;
                }
                avalon.log(vdata.Message + "<br/>" + errarr.join("<br/><br/>"));
            } else {
                avalon.log(vdata.Message)
            }

        }


    }

});