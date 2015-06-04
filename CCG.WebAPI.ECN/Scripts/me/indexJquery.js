﻿var tab = null;
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
