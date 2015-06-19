var tab = null;
var accordion = null;
var tree = null;
var jsonmenu = [];
var tabItems = [];
//init     
function initLigerUi() {
    $(function () {
        avalon.log('JqueryLog:');
        //
        //$("#home").attr("src", "home.html");
        //布局
        $("#layout1").ligerLayout({ leftWidth: 190, height: '100%', heightDiff: -34, space: 4, onHeightChanged: f_heightChanged });

        height = $(".l-layout-center").height();

        //Tab
        $("#framecenter").ligerTab({
            height: height,
            showSwitchInTab: true,
            showSwitch: true,
            onAfterAddTabItem: function (tabdata) {
                tabItems.push(tabdata);
                saveTabStatus();
            },
            onAfterRemoveTabItem: function (tabid) {
                for (var i = 0; i < tabItems.length; i++) {
                    var o = tabItems[i];
                    if (o.tabid == tabid) {
                        tabItems.splice(i, 1);
                        saveTabStatus();
                        break;
                    }
                }
            },
            onReload: function (tabdata) {
                var tabid = tabdata.tabid;               
            },
            onClose: function (a) {
                //ecnnbrs.ecnnbr = '';
            }
        });

        //面板
        $("#accordion1").ligerAccordion({ height: height - 25, speed: null });

        $(".l-link").hover(function () {
            $(this).addClass("l-link-over");
        }, function () {
            $(this).removeClass("l-link-over");
        });

        tab = $("#framecenter").ligerGetTabManager();

        //accordion = $("#accordion1").ligerGetAccordionManager();
        //tree = $("#tree1").ligerGetTreeManager();
        $("#pageloading").hide();
        // fix
        $('#endhead').prev().removeClass('l-accordion-header l-accordion-toggle-close').addClass('disabled');
    });
}
function f_heightChanged(options) {
    if (tab)
        tab.addHeight(options.diff);
    if (accordion && options.middleHeight - 25 > 0)
        accordion.setHeight(options.middleHeight - 25);
}
function f_addTab(tabid, text, url) {
    tab.addTabItem({ tabid: tabid, text: text, url: url });
}      
           
function saveTabStatus() {
    $.cookie('liger-home-tab', JSON2.stringify(tabItems));
}