var tab = null;
var accordion = null;
var tree = null;
var jsonmenu = []; 
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
            onClose: function (a) {
                ecnnbrs.ecnnbr = '';
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
