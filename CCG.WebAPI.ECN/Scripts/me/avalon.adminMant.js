'use strict';
var domain = top.users.domain;
var userid = top.users.userid;
var userrole = top.users.userrole;
var ecnnbr = top.ecnnbrs.ecnnbr;
var now = new Date();
var jsonLogoListG = [];

avalon.log("admin:" + userid + "," + userrole + "," + ecnnbr);
require(["avalon",
    "../../oniui/smartgrid/avalon.smartgrid",
    'domReady!'], function (avalon) {
        var adminMain = avalon.define({
            $id: "adminMain",
            $skipArray: ["smartgrid"],
            message: "",
            messagecss: "info",
            jsonLogoList: [],
            getLogoList: function (prefix) {
                var oldtime = new Date();

                var ajaxmodel = ECNweb.AppCode.AjaxForadminMant.getInitUserInfo(userid);

                var currtime = new Date();
                var difftime = currtime - oldtime;

                if (ajaxmodel.error) {
                    adminMain.messagecss = "danger";
                } else {
                    //avalon.log("Admin.start.");
                    //avalon.log(ajaxmodel.value);

                    if (!ajaxmodel.value) {
                        adminMain.messagecss = "danger";
                        adminMain.message = prefix + ",Error: 系统不存在任何记录 . Used:" + difftime + " ms.";
                    } else {
                        adminMain.messagecss = "success";
                        // sguserList                                 
                        jsonLogoListG = ajaxmodel.value;
                        adminMain.jsonLogoList = jsonLogoListG;

                        //avalon.log(avalon.vmodels);
                        //avalon.log(jsonLogoListG);

                        //adminMain.render(jsonLogoListG)


                        adminMain.message = prefix + ",1.Success: 加载完成.总记录: " + jsonLogoListG.length + " 条.Used:" + difftime + " ms."
                    }


                }
            },
            render: function (d) {
                avalon.vmodels.sg1.render(d);
            },
            smartgrid: {
                isAffix: true,
                pageable: false,
                htmlHelper: { // 渲染列数据的方法集合
                    // 包装工资列的数据
                    $X: function (vmId, field, index, cellValue, rowData) {//所有包装函数都会收到4个参数，分别是smartgrid组件对应vmodel的id，列标志(key)，列索引，列数据值
                        return "$" + cellValue
                    },
                    $Xdate: function (vmId, field, index, cellValue, rowData) {//所有包装函数都会收到4个参数，分别是smartgrid组件对应vmodel的id，列标志(key)，列索引，列数据值
                        // avalon.log("arguments is : ")
                        //avalon.log(arguments)
                        var dd = new Date(cellValue);
                        var dnow = new Date();
                        //long days = mss / (1000 * 60 * 60 * 24);
                        //long hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
                        //long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
                        //long seconds = (mss % (1000 * 60)) / 1000;
                        var difftime = (dnow - dd) / (1000 * 60 * 60 * 24);

                        var resultdd = ((dd.getFullYear() + "-" + dd.getMonth() + 1) + "-" + dd.getDate() + " " + dd.getHours() + ":" + dd.getMinutes() + " " + dd.getMilliseconds());

                        if (dnow - dd) {

                        }
                        resultdd = "<span> " + resultdd + "</span>";

                        if (difftime >= 1) {
                            resultdd = "<span class='alert-danger'> " + resultdd + "</span>";
                        }
                        return resultdd;
                    }
                },
                //pubUser: '', pubGroup: '', pubLevel: '', pubItemNo: '',
                //pubDomain: '', pubRole: '', pubfrmType: '', pubSelNbr: '',
                //pubPCname: '', pubIP: '', pubAuditPasswd: '', StartDate: '', pubLastLognTime: '',
                columns: [
                     {
                         key: "pubDomain",
                         name: "Domain",
                         sortable: true,
                         isLock: true,
                         align: "center",
                         width: 50
                         //format: "upperCaseName" // 定义渲染数据的方法名
                     }, {
                         key: "pubUser",
                         name: "姓名",
                         sortable: true,
                         isLock: true,
                         align: "center",
                         width: 100
                         //format: "upperCaseName" // 定义渲染数据的方法名
                     }, {
                         key: "pubRole",
                         name: "权限",
                         sortable: true,
                         isLock: true,
                         align: "center",
                         width: 100
                         //format: "upperCaseName" // 定义渲染数据的方法名
                     }, {
                         key: "pubPCname",
                         name: "电脑名",
                         sortable: true,
                         align: "center",
                         width: 200
                         //format: "upperCaseName" // 定义渲染数据的方法名
                     }, {
                         key: "pubIP",
                         name: "IP",
                         sortable: true,
                         align: "center",
                         width: 100
                         //format: "upperCaseName" // 定义渲染数据的方法名
                     }, {
                         key: "pubLastLognTime",
                         name: "最后登陆时间",
                         sortable: true,
                         align: "center",
                         width: 150,
                         format: "$Xdate"
                     }, {
                         key: "guidid",
                         name: "guidid",
                         sortable: true,
                         align: "center",
                         width: 300
                         //format: "upperCaseName" // 定义渲染数据的方法名
                     },

                ],
                data: jsonLogoListG,
                // 用户鼠标选中行或者不选中行的回调
                onRowSelect: function (rowData, isSelected) {
                    avalon.log("onRowSelect callback , arguments is : ")
                    avalon.log(arguments)
                },
                // 用户鼠标操作进行全选或者全不选的回调
                onSelectAll: function (datas, isSelectedAll) {
                    avalon.log("onSelectAll callback")
                    avalon.log(arguments)
                },
                // 本地排序的回调
                onColumnSort: function (sortType, field) {
                    avalon.log("onColumnSort callback")
                    avalon.log(arguments)
                }

            }




        }, function (vm) {
            avalon.log("加载vm3.");
            avalon.scan();
        });
        adminMain.message = "管理中心";
        //avalon.log(avalon.vmodels);
        //end                
        avalon.scan();

        adminMain.getLogoList('管理');
        //start code    
        setInterval(function () {
            adminMain.getLogoList('管理')
        }, 3000);


    });