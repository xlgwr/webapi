var tab = null;
var accordion = null;
var tree = null;
var jsonmenu = [];

//init
users.domain = $("#ldomain").text().replace(/[\[\]]/g, '')
users.userid = $("#lUserID").text().replace(/[\[\]]/g, '')
users.dept = $("#lDept").text().replace(/[\[\]]/g, '');
users.userrole = $("#lGroup").text().replace(/[\[\]]/g, '');

//avalon.log(users);

$(function () {

    //
    $("#home").attr("src", "home.htm");
    //布局
    $("#layout1").ligerLayout({ leftWidth: 190, height: '100%', heightDiff: -34, space: 4, onHeightChanged: f_heightChanged });

    var height = $(".l-layout-center").height();

    //Tab
    $("#framecenter").ligerTab({
        height: height,
        onClose: function (a) {
            ecnnbrs.ecnnbr = '';
        }
    });

    //面板
    $("#accordion1").ligerAccordion({ height: height - 24, speed: null });

    $(".l-link").hover(function () {
        $(this).addClass("l-link-over");
    }, function () {
        $(this).removeClass("l-link-over");
    });

    tab = $("#framecenter").ligerGetTabManager();

    accordion = $("#accordion1").ligerGetAccordionManager();
    //tree = $("#tree1").ligerGetTreeManager();
    $("#pageloading").hide();


    avalon.log(users);
    indexvm.initli(users.domain);
    avalon.log(indexvm.domain)
});
function f_heightChanged(options) {
    if (tab)
        tab.addHeight(options.diff);
    if (accordion && options.middleHeight - 24 > 0)
        accordion.setHeight(options.middleHeight - 24);
}
function f_addTab(tabid, text, url) {
    tab.addTabItem({ tabid: tabid, text: text, url: url });
}
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

    }

}, function (vm) {
    avalon.log("vmindex.")
});

avalon.scan();

avalon.log("role:" + users.userrole);
if (users.userrole === 'ECN_ADMIN') {

    indexvm.is_ADMIN = true;
}
