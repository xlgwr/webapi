﻿//avalon     
var indexvm = avalon.define({
    $id: "indexvm",
    message: '',
    is_ADMIN: false,
    jsonlidata: [],
    //ms-duplex
    user: top.users,
    //method
    addtab: function (tabid, text, url) {
        f_addTab(tabid, text, url);
    },
    initli: function () {
        //init userinfo
        $.ajax({
            type: 'GET',
            url: auth.apiGetUserInfoUrl,
            headers: auth.headers
        }).done(function (data) {
            avalon.log("avalonLog:ajaxInitLi.");

            avalon.log(data);

            //top.users.userid = data.Email;
            indexvm.user.userid = data.Email;

            //start other code   
            avalon.log(top.users);

        }).fail(showerrIndex);
        //end     

    },
    onLogout: function (prefix, currbtn) {

        // Cache the access token in session storage.
        sessionStorage.removeItem(tokenKey);

        avalon.log("onLogout Done!");

        top.location.href = auth.setLoginhref;
    }
}, function (vm) {
    avalon.log("vmindex.")
});

avalon.scan();

avalon.log("avalon: role:" + indexvm.user.userrole);
if (indexvm.user.userrole === 'ECN_ADMIN') {
    indexvm.is_ADMIN = true;
}

function showerrIndex(err) {

    //avalon.log(this);
    avalon.log(err);

    switch (err.status) {
        case 404:
            avalon.log("this URL:" + this.url + " was not found.Please check that.");
            return;
            break;
        default:

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