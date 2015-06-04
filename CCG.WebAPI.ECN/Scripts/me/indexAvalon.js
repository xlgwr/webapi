var tab = null;
var accordion = null;
var tree = null;
var jsonmenu = [];

//init
users.domain = $("#ldomain").text().replace(/[\[\]]/g, '')
users.userid = $("#lUserID").text().replace(/[\[\]]/g, '')
users.dept = $("#lDept").text().replace(/[\[\]]/g, '');
users.userrole = $("#lGroup").text().replace(/[\[\]]/g, '');

//avalon
var tmpdomain = users.domain;
var indexvm = avalon.define({
    $id: "indexvm",
    message: '',
    domain: tmpdomain,
    is_ADMIN: false,
    jsonlidata: [],
    addtab: function (tabid, text, url) {
        f_addTab(tabid, text, url);
    },
    initli: function (domain) {
        indexvm.domain = domain;
        avalon.log(indexvm.domain);
        if (indexvm.domain) {
            var searchajax = ECNweb.index.getindexmenu(indexvm.domain);

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

avalon.log("role:" + users.userrole);
if (users.userrole === 'ECN_ADMIN') {

    indexvm.is_ADMIN = true;
}
