//avalon
var tmpdomain = users.domain;
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
            url: apiGetUserInfoUrl,
            headers: headers
        }).done(function (data) {
            avalon.log("avalonLog:ajaxInitLi.");

            avalon.log(data);
            indexvm.user.userid = data.Email;

            //start other code   
            avalon.log(indexvm.user.domain);

            if (indexvm.user.domain) {
                var searchajax = ECNweb.index.getindexmenu(indexvm.user.domain);

                //avalon.log(searchajax);

                if (searchajax.error) {
                    indexvm.message = searchajax.error;
                    //avalon.log(searchajax.error);
                } else {
                    if (searchajax.value.length) {

                        indexvm.jsonlidata = searchajax.value;
                        //avalon.log("dgv:render ok.");
                        //avalon.log(indexvm.jsonlidata);
                    } else {
                        indexvm.jsonlidata = [];
                        indexvm.message = "无相关记录。";
                    }
                }

            }

        }).fail(function (err) {
            //showError
            avalon.log(err);
        });
        //end     

    },
    onLogout: function (prefix, currbtn) {

        // Cache the access token in session storage.
        sessionStorage.removeItem(tokenKey);

        avalon.log("onLogout Done!");

        top.location.href = setLoginhref;
    }
}, function (vm) {
    avalon.log("vmindex.")
});

avalon.scan();

avalon.log("avalon: role:" + indexvm.user.userrole);
if (indexvm.user.userrole === 'ECN_ADMIN') {
    indexvm.is_ADMIN = true;
}
