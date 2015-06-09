'use strict';
var domain = top.users.domain;
var userid = top.users.userid;
var userrole = top.users.userrole;
var ecnnbr = top.ecnnbrs.ecnnbr;
var now = new Date();
var jsonEcnnbr = [];

avalon.log(userid + "," + userrole + "," + ecnnbr);

require(["avalon",
    "../../oniui/avalon.getModel",
    "../../oniui/datepicker/avalon.datepicker",
    "../../oniui/smartgrid/avalon.smartgrid",
    "../../oniui/switchdropdown/avalon.switchdropdown",
    "../../oniui/dialog/avalon.dialog",
    "../../oniui/checkboxlist/avalon.checkboxlist",
    "../../oniui/validation/avalon.validation", 'domReady!'], function (avalon) {
        var validationVM;
        function getDatas(number) {
            var data = []
            for (var i = 0; i < number; i++) {
                data.push({
                    name: "shirly" + i,
                    age: parseInt(10 + Math.random() * 20),
                    selected: i % 3 ? false : true,
                    salary: parseInt(Math.random() * 100),
                    operate: i % 5 ? 0 : 1,
                    busy: !i % 3 && !i % 5 ? 0 : 1
                })
            }
            return data
        };
        function showError(el, data) {
            if (el.nextSibling) {
                el.parentNode.removeChild(el.nextSibling)
            }
            var next = el.nextSibling
            //console.dir(next);

            if (!(next && next.className === "error-tip")) {
                next = document.createElement("div")
                next.className = "error-tip"
                el.parentNode.appendChild(next)
            }
            next.innerHTML = data.getMessage()
        }
        function removeError(el) {
            var next = el.nextSibling
            if (next && next.className === "error-tip") {
                el.parentNode.removeChild(next)
            }
        }
        var mdtmain = avalon.define({
            $id: "mdtMain",
            $skipArray: ["validation", "smartgrid"],
            message: "",
            messagecss: "info",
            onistatehover: "onistatehover",
            //readonly for nbr
            ronbr: true,
            //jsondatafor nbr
            dataEcnnbr: [],
            datavEcnitem: [],
            //other
            initEflag: false,
            validateflag: false,
            disabelE: false,
            disabelAuditE: false,
            disabelMPC: false,
            disabelAuditMPC: false,
            disabelForinputE: false,
            disabelForinputMPC: false,
            disabelForinputLAST: false,
            //for dialog oniui
            searchEcnnbr: '',
            searchEcnnbritem: '',
            searchmessage: '',
            //init checkoutlist  
            mdt_checkbox: {
                mdt_M_tmpA: { "专用物料": false, "通用物料": false, other: "" },
                mdt_Model_tmpA: { "涉及改模": false, "不涉及改模": false, other: "" },
                def1A: { "照用": false, "报废": false, other: "" }
            },
            //for demo
            mdt_cmtindx: '',

            mdt_e: {
                mdt_domain: domain, mdt_nbr: ecnnbr, mdt_doc_type: '', mdt_type: '',
                mdt_title: '', mdt_cmmt: '', mdt_so: '', mdt_efrom: '',
                mdt_efromtime: undefined, mdt_eaudit: '', mdt_eaudittime: undefined, mdt_etime: ''
            },
            mdt_item: {
                mdt_Domain: '', mdt_cmtIndx: '', mdt_Nbr: '', mdt_part: '', mdt_part_tmp: '', mdt_rev: '',
                mdt_rev_tmp: '', mdt_M_tmp: '', mdt_Model_tmp: '', mdt_reason: '', mdt_content: '', def1: ''

            },
            vecn_item: {
                ECN_Nbr: '', ECN_Domain: '', pt_part: '', ECN_Title: '',
                ECN_Cmmt: '', ECN_UserID: '', ECN_Eff_date: undefined,
                ECN_Status: '', pt_rev: '', pt_rev2: ''
            },
            mdt_mpc: {
                mdt_mpcfrom: '', mdt_mpcfromtime: undefined, mdt_mpcaudit: '', mdt_mpcaudittime: undefined,
                mdt_mpctime: '', mdt_mpcstock: '', mdt_mpcnoqty: '', mdt_mpcttlqty: '',
                mdt_mpcneedqty: '', mdt_mpcmoqqty: '', mdt_mpcwaitqty: '', mdt_mpcusedqty: '',
                mdt_mpcmoney: '', mdt_mpcuseday: '', mdt_pur: ''
            },
            mdt_last: {
                mdt_lastfrom: '', mdt_lastfromtime: undefined, mdt_lastaudit: '', mdt_lastaudittime: undefined,
                mdt_lasttime: '', mdt_lastdesc: '', mdt_lastdesc1: false, mdt_lastdesc2: false,
                mdt_lastdesc3: false, mdt_lastother: '', mdt_effday: undefined
            },
            initchecktofalase: function () {
                $("#mdt_Model_tmp1").attr("checked", false);
                $("#mdt_Model_tmp2").attr("checked", false);
                $("#mdt_M_tmp1").attr("checked", false);
                $("#mdt_M_tmp2").attr("checked", false);
                $("#def11").attr("checked", false);
                $("#def12").attr("checked", false);

                mdtmain.mdt_checkbox.mdt_M_tmpA.other = '';
                mdtmain.mdt_checkbox.mdt_Model_tmpA.other = '';
                mdtmain.mdt_checkbox.def1A.other = '';
            },
            initchecklistItem: function () {

                mdtmain.mdt_checkbox.mdt_M_tmpA.other = '';
                mdtmain.mdt_checkbox.mdt_Model_tmpA.other = '';
                mdtmain.mdt_checkbox.def1A.other = '';

                if (mdtmain.mdt_item.mdt_M_tmp) {
                    if (mdtmain.mdt_checkbox.mdt_M_tmpA[mdtmain.mdt_item.mdt_M_tmp] !== undefined) {
                        if (mdtmain.mdt_checkbox.mdt_M_tmpA[mdtmain.mdt_item.mdt_M_tmp]) {
                            mdtmain.mdt_checkbox.mdt_M_tmpA[mdtmain.mdt_item.mdt_M_tmp] = false;
                        }
                        mdtmain.mdt_checkbox.mdt_M_tmpA[mdtmain.mdt_item.mdt_M_tmp] = true;

                        //avalon.log("-0:" + mdtmain.mdt_item.mdt_M_tmp);
                    } else {
                        //avalon.log("-1:" + mdtmain.mdt_item.mdt_M_tmp);
                        mdtmain.mdt_checkbox.mdt_M_tmpA.other = mdtmain.mdt_item.mdt_M_tmp;
                    }
                    //avalon.log("0:" + mdtmain.mdt_item.mdt_M_tmp);
                } else {
                    //avalon.log("1:" + mdtmain.mdt_item.mdt_M_tmp);  
                    $("#mdt_M_tmp1").attr("checked", false);
                    $("#mdt_M_tmp2").attr("checked", false);

                }

                if (mdtmain.mdt_item.mdt_Model_tmp) {
                    if (mdtmain.mdt_checkbox.mdt_Model_tmpA[mdtmain.mdt_item.mdt_Model_tmp] !== undefined) {
                        if (mdtmain.mdt_checkbox.mdt_Model_tmpA[mdtmain.mdt_item.mdt_Model_tmp]) {
                            mdtmain.mdt_checkbox.mdt_Model_tmpA[mdtmain.mdt_item.mdt_Model_tmp] = false;
                        }
                        mdtmain.mdt_checkbox.mdt_Model_tmpA[mdtmain.mdt_item.mdt_Model_tmp] = true;
                        // avalon.log("-0:" + mdtmain.mdt_item.mdt_Model_tmp);
                    } else {
                        //avalon.log("-1:" + mdtmain.mdt_item.mdt_Model_tmp);
                        mdtmain.mdt_checkbox.mdt_Model_tmpA.other = mdtmain.mdt_item.mdt_Model_tmp;
                    }
                    //avalon.log("0:" + mdtmain.mdt_item.mdt_Model_tmp);
                } else {
                    //avalon.log("1:" + mdtmain.mdt_item.mdt_Model_tmp); 
                    $("#mdt_Model_tmp1").attr("checked", false);
                    $("#mdt_Model_tmp2").attr("checked", false);
                }

                if (mdtmain.mdt_item.def1) {
                    if (mdtmain.mdt_checkbox.def1A[mdtmain.mdt_item.def1] !== undefined) {
                        if (mdtmain.mdt_checkbox.def1A[mdtmain.mdt_item.def1]) {
                            mdtmain.mdt_checkbox.def1A[mdtmain.mdt_item.def1] = false;
                        }
                        mdtmain.mdt_checkbox.def1A[mdtmain.mdt_item.def1] = true;
                    } else {
                        mdtmain.mdt_checkbox.def1A.other = mdtmain.mdt_item.def1;
                    }
                    //avalon.log("0:" + mdtmain.mdt_item.def1);
                } else {
                    //avalon.log("1:" + mdtmain.mdt_item.def1);   
                    $("#def11").attr("checked", false);
                    $("#def12").attr("checked", false);
                }
            },
            //init attr
            initatrrItem: function (ajaxgetmodelItem) { //checkbox     for mdt_item  

                mdtmain.initchecktofalase();

                if (ajaxgetmodelItem.value && ajaxgetmodelItem.value.remark !== "-1") {
                    mdtmain.mdt_item.mdt_Domain = ajaxgetmodelItem.value.mdt_Domain;
                    mdtmain.mdt_item.mdt_cmtIndx = ajaxgetmodelItem.value.mdt_cmtIndx;
                    mdtmain.mdt_item.mdt_Nbr = ajaxgetmodelItem.value.mdt_Nbr;
                    mdtmain.mdt_item.mdt_part = ajaxgetmodelItem.value.mdt_part;
                    mdtmain.mdt_item.mdt_part_tmp = ajaxgetmodelItem.value.mdt_part_tmp;
                    mdtmain.mdt_item.mdt_rev = ajaxgetmodelItem.value.mdt_rev;
                    mdtmain.mdt_item.mdt_rev_tmp = ajaxgetmodelItem.value.mdt_rev_tmp;

                    mdtmain.mdt_item.mdt_M_tmp = ajaxgetmodelItem.value.mdt_M_tmp;
                    mdtmain.mdt_item.mdt_Model_tmp = ajaxgetmodelItem.value.mdt_Model_tmp;

                    mdtmain.mdt_item.mdt_reason = ajaxgetmodelItem.value.mdt_reason;
                    mdtmain.mdt_item.mdt_content = ajaxgetmodelItem.value.mdt_content;

                    mdtmain.mdt_item.def1 = ajaxgetmodelItem.value.def1;

                    //init checklist
                    mdtmain.initchecklistItem();
                } else {
                    mdtmain.mdt_checkbox.mdt_M_tmpA.专用物料 = false; mdtmain.mdt_checkbox.mdt_M_tmpA.通用物料 = false; mdtmain.mdt_checkbox.mdt_M_tmpA.other = '';
                    mdtmain.mdt_checkbox.mdt_Model_tmpA.涉及改模 = false; mdtmain.mdt_checkbox.mdt_Model_tmpA.不涉及改模 = false; mdtmain.mdt_checkbox.mdt_Model_tmpA.other = '';
                    mdtmain.mdt_checkbox.def1A.照用 = false; mdtmain.mdt_checkbox.def1A.报废 = false; mdtmain.mdt_checkbox.def1A.other = '';

                    //item
                    mdtmain.mdt_item.mdt_Domain = ''; mdtmain.mdt_item.mdt_cmtIndx = '';
                    mdtmain.mdt_item.mdt_Nbr = ''; mdtmain.mdt_item.mdt_part = '';
                    mdtmain.mdt_item.mdt_part_tmp = ''; mdtmain.mdt_item.mdt_rev = '';
                    mdtmain.mdt_item.mdt_rev_tmp = ''; mdtmain.mdt_item.mdt_M_tmp = ''; mdtmain.mdt_item.mdt_Model_tmp = '';
                    mdtmain.mdt_item.mdt_reason = ''; mdtmain.mdt_item.mdt_content = ''; mdtmain.mdt_item.def1 = '';
                }

            },
            initattr: function () {

                //iteminit
                mdtmain.initatrrItem('');
                //mdt_e
                mdtmain.mdt_e.mdt_doc_type = ''; mdtmain.mdt_e.mdt_type = '';
                mdtmain.mdt_e.mdt_title = ''; mdtmain.mdt_e.mdt_cmmt = '';
                mdtmain.mdt_e.mdt_so = ''; mdtmain.mdt_e.mdt_efrom = '';
                mdtmain.mdt_e.mdt_efromtime = undefined; mdtmain.mdt_e.mdt_eaudit = '';
                mdtmain.mdt_e.mdt_eaudittime = undefined; mdtmain.mdt_e.mdt_etime = '';

                //mdt_mpc
                mdtmain.mdt_mpc.mdt_mpcfrom = ''; mdtmain.mdt_mpc.mdt_mpcfromtime = undefined;
                mdtmain.mdt_mpc.mdt_mpcaudit = ''; mdtmain.mdt_mpc.mdt_mpcaudittime = undefined;
                mdtmain.mdt_mpc.mdt_mpctime = ''; mdtmain.mdt_mpc.mdt_mpcstock = '';
                mdtmain.mdt_mpc.mdt_mpcnoqty = ''; mdtmain.mdt_mpc.mdt_mpcttlqty = '';
                mdtmain.mdt_mpc.mdt_mpcneedqty = ''; mdtmain.mdt_mpc.mdt_mpcmoqqty = '';
                mdtmain.mdt_mpc.mdt_mpcwaitqty = ''; mdtmain.mdt_mpc.mdt_mpcusedqty = '';
                mdtmain.mdt_mpc.mdt_mpcmoney = ''; mdtmain.mdt_mpc.mdt_mpcuseday = '';
                mdtmain.mdt_mpc.mdt_pur = '';
                //mdt_last
                mdtmain.mdt_last.mdt_lastfrom = '';
                mdtmain.mdt_last.mdt_lastfromtime = undefined; mdtmain.mdt_last.mdt_lastaudit = '';
                mdtmain.mdt_last.mdt_lastaudittime = undefined; mdtmain.mdt_last.mdt_lasttime = '';
                mdtmain.mdt_last.mdt_lastdesc = ''; mdtmain.mdt_last.mdt_lastdesc1 = false;
                mdtmain.mdt_last.mdt_lastdesc2 = false; mdtmain.mdt_last.mdt_lastdesc3 = false;
                mdtmain.mdt_last.mdt_lastother = ''; mdtmain.mdt_last.mdt_effday = undefined;

            },
            //oniui  
            //dialog
            check1: ["1"],
            show: function (id) {
                avalon.vmodels[id].toggle = true;
            },
            onkeydown: function (e) {
                //avalon.log(e);
                if (e.which === 13) {
                    mdtmain.onsearch();

                }
            },
            onkeydownitem: function (e) {
                //avalon.log(e);
                if (e.which === 13) {
                    mdtmain.onsearchitem();

                }
            },
            onsearch: function () {
                if (mdtmain.mdt_e.mdt_domain) {       // && mdtmain.searchEcnnbr
                    mdtmain.searchmessage = "开始查询。。。";

                    var tmpnbr = mdtmain.searchEcnnbr || userid;
                    //ajax
                    var starttime = new Date();

                    var searchajax = ECNweb.AppCode.AjaxForMDT.ecn_mstr_get(mdtmain.mdt_e.mdt_domain, tmpnbr, 5, '');

                    //avalon.log(searchajax);
                    var endtime = new Date();
                    var usetime = endtime - starttime;
                    avalon.log(usetime);

                    if (searchajax.error) {
                        mdtmain.searchmessage = searchajax.error;
                    } else {
                        if (searchajax.value.length) {
                            mdtmain.searchmessage = "查询成功。。。" + "Used：" + usetime + "毫秒";

                            mdtmain.dataEcnnbr = searchajax.value;

                            //jsonEcnnbr = searchajax.value;
                            //render  
                            //avalon.vmodels.sg1.render(jsonEcnnbr);

                            //avalon.log("dgv:render ok.");   
                            //avalon.log(jsonEcnnbr);
                        } else {
                            mdtmain.dataEcnnbr = [];
                            mdtmain.searchmessage = "无相关记录。";
                        }
                    }
                    $("#searchnbr").focus();
                }
            },
            onsearchitem: function () {
                if (mdtmain.mdt_e.mdt_domain && mdtmain.mdt_e.mdt_nbr) {       // && mdtmain.searchEcnnbr
                    mdtmain.searchmessage = "开始查询。。。";

                    var tmpnbr = mdtmain.searchEcnnbritem;
                    //ajax
                    var starttime = new Date();

                    var searchajax = ECNweb.AppCode.AjaxForMDT.ecn_vMdtItem_get(mdtmain.mdt_e.mdt_domain, mdtmain.mdt_e.mdt_nbr, tmpnbr);

                    //avalon.log(searchajax);
                    var endtime = new Date();
                    var usetime = endtime - starttime;
                    avalon.log(usetime);

                    if (searchajax.error) {
                        mdtmain.searchmessage = searchajax.error;
                    } else {
                        if (searchajax.value.length) {
                            mdtmain.searchmessage = "查询成功。。。" + "Used：" + usetime + "毫秒";

                            mdtmain.datavEcnitem = searchajax.value;

                            //jsonEcnnbr = searchajax.value;
                            //render  
                            //avalon.vmodels.sg1.render(jsonEcnnbr);

                            //avalon.log("dgv:render ok.");   
                            //avalon.log(mdtmain.datavEcnitem);
                        } else {
                            mdtmain.datavEcnitem = [];
                            mdtmain.searchmessage = "无相关记录。";
                        }
                    }
                    $("#searchnbritem").focus();
                } else {
                    mdtmain.searchmessage = "Domain and EcnNum is null";
                }
            },
            $aaOpts: {
                title: "选择(top 5) ECN：",
                width: 600
            },
            //me repeat
            dialogclose: function () {
                //avalon.log(tmpdialog);
                $("#mdt_type").focus();
                tmpdialog.hide();
                $("#mdt_type").focus();
            },
            dialogcloseitem: function () {
                //avalon.log(tmpdialog);
                $("#tt1").focus();
                tmpdialog.hide();
                $("#tt1").focus();
            },
            trclick: function (currel) {
                //avalon.log(currel);
                mdtmain.searchmessage = "选择:" + currel.ECN_Nbr;
                mdtmain.mdt_e.mdt_nbr = currel.ECN_Nbr;
                $("#searchnbr").focus();
            },
            trclickitem: function (currel) {
                //avalon.log(currel);
                //mdtmain.initchecktofalase();

                mdtmain.searchmessage = "选择:" + currel.pt_part;

                mdtmain.mdt_item.mdt_part = currel.pt_part;
                mdtmain.mdt_item.mdt_rev = currel.pt_rev;
                mdtmain.mdt_item.mdt_part_tmp = currel.pt_part;
                mdtmain.mdt_item.mdt_rev_tmp = currel.pt_rev2;

                mdtmain.mdt_item.mdt_M_tmp = currel.mdt_M_tmp;
                mdtmain.mdt_item.mdt_Model_tmp = currel.mdt_Model_tmp;

                mdtmain.mdt_item.mdt_reason = currel.mdt_reason;
                mdtmain.mdt_item.mdt_content = currel.mdt_content;

                mdtmain.mdt_item.def1 = currel.def1;

                mdtmain.initchecklistItem();

                avalon.log(currel.mdt_M_tmp + ',' + currel.mdt_Model_tmp + ',' + currel.def1);
                $("#searchnbritem").focus();

            },
            //smartgrid
            smartgrid: {
                isAffix: true,
                pageable: false,
                selectable: {
                    type: "Radio" //为表格添加选中行操作框,可以设置为"Checkbox"或者"Radio" ,
                },
                //allSelected:false,
                allChecked: false,
                htmlHelper: { // 渲染列数据的方法集合                       
                    $Xdate: function (vmId, field, index, cellValue, rowData) {//所有包装函数都会收到4个参数，分别是smartgrid组件对应vmodel的id，列标志(key)，列索引，列数据值
                        // avalon.log("arguments is : ")
                        //avalon.log(arguments)
                        var dd = new Date(cellValue);
                        var resultdd = ((dd.getMonth() + 1) + "-" + dd.getDate() + "-" + dd.getFullYear());
                        return resultdd;
                    }
                },
                columns: [
                   {
                       key: "ECN_Domain", name: "Domain",
                       sortable: true, isLock: true,
                       align: "left",// defaultValue: "shirly",
                       customClass: "ddd", toggle: false, width: 30
                       //format: "upperCaseName" // 定义渲染数据的方法名
                   }, {
                       key: "ECN_Nbr", name: "ECN编号",
                       sortable: true, isLock: true,
                       align: "left",                         // defaultValue: "shirly",
                       customClass: "ddd", toggle: false,
                       width: 75
                       //format: "upperCaseName" // 定义渲染数据的方法名
                   }, {
                       key: "ECN_doc_type", name: "文档类型",
                       //type: "Number",
                       sortable: false,                          //format: "$X",
                       align: "center", width: 35
                   }, {
                       key: "ECN_type", name: "ECN类型",
                       //type: "Number",
                       sortable: false,                         //format: "$X",
                       align: "center", width: 70
                   }, {
                       key: "ECN_Status", name: "Status",
                       //type: "Number",
                       sortable: false,                         //format: "$X",
                       align: "center", width: 55
                   }, {
                       key: "ECN_Title", name: "标题",
                       //type: "Number",
                       sortable: false,                         //format: "$X",
                       align: "center", width: 150
                   }, {
                       key: "ECN_Date", name: "CreateDate",
                       type: "Date", sortable: false,
                       format: "$Xdate", align: "center",
                       width: 35
                   }
                ],
                data: [],//getDatas(10),
                // 用户鼠标选中行或者不选中行的回调
                onRowSelect: function (rowData, isSelected) {
                    if (isSelected) {
                        mdtmain.searchmessage = "选择:" + rowData.ECN_Nbr;
                        mdtmain.mdt_e.mdt_nbr = rowData.ECN_Nbr;
                    }
                    //avalon.log("onRowSelect callback , arguments is : ")
                    //avalon.log(arguments)
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

            },
            // domvisible: false,
            reset: function () {
                validationVM && validationVM.resetAll()
            },
            checkAll: function () {
                validationVM && validationVM.validateAll()
            },
            validation: {
                resetInFocus: false,
                onInit: function (vm) {
                    validationVM = vm
                },
                onReset: function (e, data) {
                    data.valueResetor && data.valueResetor()
                    avalon(this).removeClass("error success")
                    removeError(this)
                },
                onError: function (reasons) {
                    reasons.forEach(function (reason) {
                        avalon(this).removeClass("success").addClass("error")
                        showError(this, reason)
                    }, this)
                    mdtmain.validateflag = false;
                    //avalon.log("erroron:" + reasons)
                },
                onSuccess: function () {
                    avalon(this).removeClass("error").addClass("success")
                    removeError(this)
                    mdtmain.validateflag = true;
                    avalon.log("successon")
                },
                onValidateAll: function (reasons) {
                    //avalon.log("onall:" + reasons);
                    reasons.forEach(function (reason) {
                        avalon(reason.element).removeClass("success").addClass("error")
                        showError(reason.element, reason)
                        //avalon.log(reason);
                    })
                    if (reasons.length === 0) {
                        avalon.log("全部验证成功！")
                        mdtmain.validateflag = true;
                    } else {
                        avalon.log("全部验证false！")
                        mdtmain.validateflag = false;
                    }
                }
            },
            //datepicker: {
            //timer:true,
            //parseDate: function (str) {
            //    var reg = "^(\\d{4})" + "年" + "(\\d{1,2})" + "月" + "(\\d{1,2})" + "日$";
            //    reg = new RegExp(reg);
            //    var x = str.match(reg);
            //    return x ? new Date(x[1], x[2] * 1 - 1, x[3]) : null;
            //},
            //formatDate: function (date) {
            //    var separator = this.separator,
            //        year = date.getFullYear(),
            //        month = date.getMonth(),
            //        day = date.getDate();
            //    return year + "年" + this.formatNum(month + 1, 2) + "月" + this.formatNum(day, 2) + "日";
            //}    
            //},
            //end oniui
            onRadio: function (curr) {

                //avalon.log(curr.checked);
                //avalon.log(curr.name);
                //avalon.log(curr.value);   
                if (curr.checked) {
                    mdtmain.mdt_item[curr.name] = curr.value;
                } else {
                    mdtmain.mdt_item[curr.name] = '';
                }
                //avalon.log(mdtmain.mdt_item[curr.name]);
            },

            initE: function (prefix) {
                if (mdtmain.mdt_e.mdt_domain && mdtmain.mdt_e.mdt_nbr) {
                    mdtmain.messagecss = "info";
                    mdtmain.message = prefix + " Notice: 正在检查 " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr;
                    //init for attr
                    mdtmain.initattr();

                    var ajaxgetmodel = ECNweb.AppCode.AjaxForMDT.mdt_mstr_get(mdtmain.mdt_e.mdt_domain, mdtmain.mdt_e.mdt_nbr);
                    var ajaxgetmodelItem = ECNweb.AppCode.AjaxForMDT.mdt_item_get(mdtmain.mdt_e.mdt_domain, mdtmain.mdt_e.mdt_nbr);
                    //console.dir(ajaxgetmodel);

                    //init mstr
                    if (ajaxgetmodel.error) {
                        mdtmain.messagecss = "danger";
                        mdtmain.disabelE = true;
                        mdtmain.disabelAuditE = true;

                        mdtmain.message = prefix + ",Error: " + ajaxgetmodel.error.Message;
                    } else {
                        mdtmain.messagecss = "success";
                        mdtmain.disabelE = false;
                        mdtmain.disabelAuditE = false;


                        if (!ajaxgetmodel.value) {
                            mdtmain.ronbr = true;
                            mdtmain.message = prefix + ",1.Success: 完成.可以新增." + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                            avalon.log("start.");


                        } else {
                            if (ajaxgetmodel.value.remark === "-1") {
                                mdtmain.messagecss = "danger";
                                mdtmain.ronbr = false;
                                mdtmain.message = prefix + ",Error: 系统不存在对应的 ECN ." + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                                mdtmain.disabelE = true;
                                mdtmain.disabelAuditE = true;
                                return;
                            } else {
                                // var tmpjson = JSON.parse(ajaxgetmodel.json);
                                mdtmain.ronbr = true;
                                mdtmain.mdt_cmtindx = ajaxgetmodel.value.mdt_cmtIndx;
                                //mdt_e
                                mdtmain.mdt_e.mdt_doc_type = ajaxgetmodel.value.mdt_doc_type;
                                mdtmain.mdt_e.mdt_type = ajaxgetmodel.value.mdt_type; //
                                mdtmain.mdt_e.mdt_title = ajaxgetmodel.value.mdt_Title;
                                mdtmain.mdt_e.mdt_cmmt = ajaxgetmodel.value.mdt_Cmmt; //

                                mdtmain.mdt_e.mdt_so = ajaxgetmodel.value.mdt_so; //
                                //item    

                                //e
                                mdtmain.mdt_e.mdt_efrom = ajaxgetmodel.value.mdt_efrom;
                                mdtmain.mdt_e.mdt_efromtime = ajaxgetmodel.value.mdt_efromtime || undefined;;
                                mdtmain.mdt_e.mdt_eaudit = ajaxgetmodel.value.mdt_eaudit;
                                mdtmain.mdt_e.mdt_eaudittime = ajaxgetmodel.value.mdt_eaudittime || undefined;
                                mdtmain.mdt_e.mdt_etime = ajaxgetmodel.value.mdt_etime;
                                //mpc
                                mdtmain.mdt_mpc.mdt_mpcfrom = ajaxgetmodel.value.mdt_mpcfrom;
                                mdtmain.mdt_mpc.mdt_mpcfromtime = ajaxgetmodel.value.mdt_mpcfromtime || undefined;;
                                mdtmain.mdt_mpc.mdt_mpcaudit = ajaxgetmodel.value.mdt_mpcaudit;
                                mdtmain.mdt_mpc.mdt_mpcaudittime = ajaxgetmodel.value.mdt_mpcaudittime || undefined;;
                                mdtmain.mdt_mpc.mdt_mpctime = ajaxgetmodel.value.mdt_mpctime;
                                mdtmain.mdt_mpc.mdt_mpcstock = ajaxgetmodel.value.mdt_mpcStock;
                                mdtmain.mdt_mpc.mdt_mpcnoqty = ajaxgetmodel.value.mdt_mpcNoQty;
                                mdtmain.mdt_mpc.mdt_mpcttlqty = ajaxgetmodel.value.mdt_mpcTtlQty;
                                mdtmain.mdt_mpc.mdt_mpcneedqty = ajaxgetmodel.value.mdt_mpcNeedQty;
                                mdtmain.mdt_mpc.mdt_mpcmoqqty = ajaxgetmodel.value.mdt_mpcMoqQty;
                                mdtmain.mdt_mpc.mdt_mpcwaitqty = ajaxgetmodel.value.mdt_mpcWaitQty;
                                mdtmain.mdt_mpc.mdt_mpcusedqty = ajaxgetmodel.value.mdt_mpcUsedQty;
                                mdtmain.mdt_mpc.mdt_mpcmoney = ajaxgetmodel.value.mdt_mpcMoney;
                                mdtmain.mdt_mpc.mdt_mpcuseday = ajaxgetmodel.value.mdt_mpcUseDay;
                                mdtmain.mdt_mpc.mdt_pur = ajaxgetmodel.value.mdt_pur;
                                //last
                                mdtmain.mdt_last.mdt_lastfrom = ajaxgetmodel.value.mdt_lastfrom;
                                mdtmain.mdt_last.mdt_lastfromtime = ajaxgetmodel.value.mdt_lastfromtime || undefined;;
                                mdtmain.mdt_last.mdt_lastaudit = ajaxgetmodel.value.mdt_lastaudit;
                                mdtmain.mdt_last.mdt_lastaudittime = ajaxgetmodel.value.mdt_lastaudittime || undefined;;
                                mdtmain.mdt_last.mdt_lasttime = ajaxgetmodel.value.mdt_lasttime;

                                mdtmain.mdt_last.mdt_lastdesc = ajaxgetmodel.value.mdt_lastDesc;

                                //avalon.log("last0:" + mdtmain.mdt_last.mdt_lastdesc);
                                if (mdtmain.mdt_last.mdt_lastdesc) {
                                    var descprefix = mdtmain.mdt_last.mdt_lastdesc.substring(0, 1);
                                    //avalon.log(descprefix);
                                    switch (descprefix) {
                                        case "1":
                                            mdtmain.mdt_last.mdt_lastdesc1 = true;
                                            break;
                                        case "2":
                                            mdtmain.mdt_last.mdt_lastdesc2 = true;
                                            break;
                                        case "3":
                                            mdtmain.mdt_last.mdt_lastdesc3 = true;
                                            break;
                                        default:
                                            mdtmain.mdt_last.mdt_lastdesc1 = false;
                                            mdtmain.mdt_last.mdt_lastdesc2 = false;
                                            mdtmain.mdt_last.mdt_lastdesc3 = false;
                                    }
                                }


                                mdtmain.mdt_last.mdt_lastother = ajaxgetmodel.value.mdt_lastOther;

                                mdtmain.mdt_last.mdt_effday = ajaxgetmodel.value.mdt_EffDay;//.split('T')[0].toString();//ajaxgetmodel.value.mdt_EffDay;
                                //init for item


                                //avalon.log("init:"+ajaxgetmodel.value.mdt_efromtime + "," + ajaxgetmodel.value.mdt_eaudittime);
                                mdtmain.message = prefix + ",2.Success: 完成: " + ajaxgetmodel.value.mdt_cmtIndx + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr


                            }
                        };
                    };
                    //end init mstr  
                    mdtmain.initatrrItem(ajaxgetmodelItem);
                    //end for item
                } else {
                    mdtmain.ronbr = false;
                    // mdtmain.messagecss = "danger";
                    // mdtmain.message = prefix + ",Error: 域 与 ECN/ECR# 不能同时为空。";
                }
            },
            submitE: function () {
                var prefix = "工程部";
                var olddate = new Date();
                if (!mdtmain.validateflag) {
                    avalon.log("vm1:");
                    mdtmain.messagecss = "danger";
                    mdtmain.message = prefix + ",请检查数据的完整性，谢谢！";
                } else {
                    mdtmain.disabelE = true;
                    mdtmain.message = prefix + " Notice: 正在保存 " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr;
                    var olduserid = mdtmain.mdt_e.mdt_efrom;
                    var oldtime = mdtmain.mdt_e.mdt_efromtime;
                    mdtmain.mdt_e.mdt_efrom = userid;
                    mdtmain.mdt_e.mdt_efromtime = now;

                    //console.dir(mdtmain.$model);

                    var dd = JSON.stringify(mdtmain.$model.mdt_e);

                    //avalon.log(dd);
                    var ajax2 = ECNweb.AppCode.AjaxForMDT.mdt_mstr_e_put(dd, userid);
                    //console.dir(ajax2);
                    //{error: null, value: 8, json: "8;/*"}
                    //error[Message,Type]
                    var nowdate = new Date();
                    var difftime = nowdate - olddate;

                    if (ajax2.error) {
                        mdtmain.messagecss = "danger";
                        mdtmain.message = prefix + ",Error: " + ajax2.error.Message
                    } else {
                        if (ajax2.value === 0) {
                            mdtmain.messagecss = "success";
                            mdtmain.message = prefix + ",Success: Update Success. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        } else if (ajax2.value > 0) {
                            mdtmain.messagecss = "success";
                            mdtmain.mdt_cmtindx = ajax2.value;
                            mdtmain.message = prefix + ",Success: Add Success.flag:" + ajax2.value + ",Id: " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;
                        } else if (ajax2.value === -5) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 无权修改. 请联系IT部授权，谢谢.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        } else if (ajax2.value === -2) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Update Faile. 早已审核.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        } else if (ajax2.value === -4) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Add Faile. System is not exits this ECN. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        } else if (ajax2.value === -1) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Update Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        } else if (ajax2.value === -3) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Update Faile. system is not exits this ecn.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        } else if (!ajax2.value) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Save Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + difftime;

                        }

                        if (ajax2.value < 0) {
                            mdtmain.mdt_e.mdt_efrom = olduserid;
                            mdtmain.mdt_e.mdt_efromtime = oldtime;
                        }
                    }
                    mdtmain.disabelE = false;

                    avalon.log(ajax2.value + "," + mdtmain.message);
                    dd = null;
                    ajax2 = null;
                }


            },
            submitItem: function () {
                if (!mdtmain.mdt_item.mdt_part || !mdtmain.mdt_item.mdt_part_tmp) {
                    return;
                }
                //mdt_item: {    mdt_Domain:'',
                //        mdt_cmtIndx: '', mdt_Nbr: '', mdt_part: '', mdt_part_tmp: '', mdt_rev: '',
                //        mdt_rev_tmp: '', mdt_M_tmp: '', mdt_Model_tmp: '', mdt_reason: '', mdt_content: '',def1:''
                //}
                var prefix = "工程部item";

                var tmpdate = new Date();

                if (!mdtmain.validateflag) {
                    avalon.log("vm1items:");
                    mdtmain.messagecss = "danger";
                    mdtmain.message = prefix + ",请检查数据的完整性，谢谢！";
                } else {
                    mdtmain.disabelE = true;
                    mdtmain.message = prefix + " Notice: 正在保存 " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr;

                    mdtmain.mdt_item.mdt_Domain = mdtmain.mdt_e.mdt_domain;
                    mdtmain.mdt_item.mdt_Nbr = mdtmain.mdt_e.mdt_nbr;

                    var olduserid = mdtmain.mdt_e.mdt_efrom;
                    var oldtime = mdtmain.mdt_e.mdt_efromtime;

                    mdtmain.mdt_e.mdt_efrom = userid;
                    mdtmain.mdt_e.mdt_efromtime = now;

                    //console.dir(mdtmain.$model);

                    var dd = JSON.stringify(mdtmain.$model.mdt_item);

                    //avalon.log(dd);
                    var ajax2 = ECNweb.AppCode.AjaxForMDT.mdt_mstr_item_put(dd, userid);
                    //console.dir(ajax2);
                    //{error: null, value: 8, json: "8;/*"}
                    //error[Message,Type]
                    var cuurdate = new Date();
                    var diffdate = cuurdate - tmpdate;
                    if (ajax2.error) {
                        mdtmain.messagecss = "danger";
                        mdtmain.message = prefix + ",Error: " + ajax2.error.Message + ",Used:" + diffdate + "ms";
                    } else {
                        if (ajax2.value === 0) {
                            mdtmain.messagecss = "success";
                            mdtmain.message = prefix + ",Success: Update Success. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (ajax2.value > 0) {
                            mdtmain.messagecss = "success";
                            mdtmain.mdt_cmtindx = ajax2.value;
                            mdtmain.message = prefix + ",Success: Add Success.flag:" + ajax2.value + ",Id: " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";
                        } else if (ajax2.value === -5) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 无权修改. 请联系IT部授权，谢谢.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (ajax2.value === -2) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Update Faile. 早已审核.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (ajax2.value === -4) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Add Faile. System is not exits this ECN. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (ajax2.value === -6) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Add Faile. System is not exits this MDT(物料处置单). flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (ajax2.value === -1) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Update Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (ajax2.value === -3) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Update Faile. system is not exits this ecn.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        } else if (!ajax2.value) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Save Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr + ",Used:" + diffdate + "ms";

                        }

                        if (ajax2.value < 0) {
                            mdtmain.mdt_e.mdt_efrom = olduserid;
                            mdtmain.mdt_e.mdt_efromtime = oldtime;
                        }
                    }
                    mdtmain.disabelE = false;

                    avalon.log(ajax2.value + "," + mdtmain.message);
                    dd = null;
                    ajax2 = null;
                }


            },
            submitMPC: function () {
                var prefix = "供应链";
                if (mdtmain.mdt_cmtindx) {
                    mdtmain.disabelAuditMPC = true;
                    var olduserid = mdtmain.mdt_mpc.mdt_mpcfrom;
                    var oldtime = mdtmain.mdt_mpc.mdt_mpcfromtime;

                    mdtmain.mdt_mpc.mdt_mpcfrom = userid;
                    mdtmain.mdt_mpc.mdt_mpcfromtime = now;

                    mdtmain.message = prefix + " Notice:正在保存 " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr;
                    //console.dir(mdtmain.$model);

                    var cindex = mdtmain.mdt_cmtindx;
                    var model = JSON.stringify(mdtmain.$model.mdt_mpc);

                    //avalon.log("mpc save: index->" + cindex + model + "," + userid);
                    var ajax2 = ECNweb.AppCode.AjaxForMDT.mdt_mstr_mpc_put(cindex, model, userid);
                    //console.dir(ajax2);
                    //{error: null, value: 8, json: "8;/*"}
                    //error[Message,Type]
                    if (ajax2.error) {
                        mdtmain.messagecss = "danger";
                        mdtmain.message = prefix + ",Error: " + ajax2.error.Message
                    } else {
                        if (ajax2.value === 1) {
                            mdtmain.messagecss = "success";

                            mdtmain.message = prefix + ",Success: 保存成功. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === -1) {
                            mdtmain.messagecss = "warning";

                            mdtmain.message = prefix + ",Error: 保存失败.flag:" + ajax2.value + ",Id: " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                        } else if (ajax2.value === -5) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 无权保存. 请联系IT部授权，谢谢.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === -2) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 保存失败 早已签批.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === 0) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 不存在.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (!ajax2.value) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Save Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                        }

                        if (ajax2.value <= 0) {
                            mdtmain.mdt_mpc.mdt_mpcfrom = olduserid;
                            mdtmain.mdt_mpc.mdt_mpcfromtime = oldtime;
                        }
                    }
                    mdtmain.disabelAuditMPC = false;

                    avalon.log(ajax2.value + "," + mdtmain.message);
                    // dd = null;
                    ajax2 = null;
                } else {
                    mdtmain.messagecss = "warning";
                    mdtmain.message = prefix + ",Error:  数据为空,请刷新后再保存."

                }
            },
            submitLAST: function (currbtn) {
                var prefix = "最终处理结果";
                if (mdtmain.mdt_cmtindx) {
                    currbtn.disabled = true;
                    var olduserid = mdtmain.mdt_last.mdt_lastfrom;
                    var oldtime = mdtmain.mdt_last.mdt_lastfromtime;

                    mdtmain.mdt_last.mdt_lastfrom = userid;
                    mdtmain.mdt_last.mdt_lastfromtime = now;

                    mdtmain.message = prefix + " Notice:正在保存 " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr;
                    //console.dir(mdtmain.$model);

                    var cindex = mdtmain.mdt_cmtindx;
                    var model = JSON.stringify(mdtmain.$model.mdt_last);

                    //avalon.log("mpc save: index->" + cindex + model + "," + userid);
                    var ajax2 = ECNweb.AppCode.AjaxForMDT.mdt_mstr_last_put(cindex, model, userid);
                    //console.dir(ajax2);
                    //{error: null, value: 8, json: "8;/*"}
                    //error[Message,Type]
                    if (ajax2.error) {
                        mdtmain.messagecss = "danger";
                        mdtmain.message = prefix + ",Error: " + ajax2.error.Message
                    } else {
                        if (ajax2.value === 1) {
                            mdtmain.messagecss = "success";

                            mdtmain.message = prefix + ",Success: 保存成功. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === -1) {
                            mdtmain.messagecss = "warning";

                            mdtmain.message = prefix + ",Error: 保存失败.flag:" + ajax2.value + ",Id: " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                        } else if (ajax2.value === -5) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 无权保存. 请联系IT部授权，谢谢.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === -2) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 保存失败 早已批准.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === 0) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 不存在.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (!ajax2.value) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Save Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                        }
                        if (ajax2.value <= 0) {
                            mdtmain.mdt_last.mdt_lastfrom = olduserid;
                            mdtmain.mdt_last.mdt_lastfromtime = oldtime;
                        }
                    }
                    currbtn.disabled = false;

                    avalon.log(ajax2.value + "," + mdtmain.message);
                    // dd = null;
                    ajax2 = null;
                } else {
                    mdtmain.messagecss = "warning";
                    mdtmain.message = prefix + ",Error:  数据为空,请刷新后再保存."

                }
            },
            submitAudit: function (prefix, auditname, roleprefix, currbtn) {
                //roleprefix e,mpc,last
                if (mdtmain.mdt_cmtindx) {
                    //mdtmain.disabelAuditE = true;
                    currbtn.disabled = true;
                    mdtmain.message = prefix + " Notice: 正在" + auditname + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr;
                    //console.dir(mdtmain.$model);

                    var cindex = mdtmain.mdt_cmtindx; //JSON.stringify(mdtmain.$model.mdt_e);

                    avalon.log("audit:" + cindex + "," + userid + "," + roleprefix);
                    //console.dir(currbtn);

                    var ajax2 = ECNweb.AppCode.AjaxForMDT.mdt_mstr_audit_put(cindex, userid, roleprefix);
                    //console.dir(ajax2);
                    //{error: null, value: 8, json: "8;/*"}
                    //error[Message,Type]
                    if (ajax2.error) {
                        mdtmain.messagecss = "danger";
                        mdtmain.message = prefix + ",Error: " + ajax2.error.Message
                    } else {
                        if (ajax2.value === 1) {
                            mdtmain.messagecss = "success";
                            if (roleprefix === 'e') {
                                mdtmain.mdt_e.mdt_eaudit = userid;
                                mdtmain.mdt_e.mdt_eaudittime = now;
                            } else if (roleprefix === 'mpc') {
                                mdtmain.mdt_mpc.mdt_mpcaudit = userid;
                                mdtmain.mdt_mpc.mdt_mpcaudittime = now;
                            } else if (roleprefix === 'last') {
                                mdtmain.mdt_last.mdt_lastaudit = userid;
                                mdtmain.mdt_last.mdt_lastaudittime = now;
                            }

                            mdtmain.message = prefix + ",Success: " + auditname + "成功. flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === -1) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: " + auditname + "失败.flag:" + ajax2.value + ",Id: " + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                        } else if (ajax2.value === -5) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 无权" + auditname + ". 请联系IT部授权，谢谢.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === -2) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 早已" + auditname + ".flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (ajax2.value === 0) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: 不存在.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr

                        } else if (!ajax2.value) {
                            mdtmain.messagecss = "warning";
                            mdtmain.message = prefix + ",Error: Save Faile. SQL error.flag:" + ajax2.value + "," + mdtmain.mdt_e.mdt_domain + "," + mdtmain.mdt_e.mdt_nbr
                        }
                    }
                    //mdtmain.disabelAuditE = false;
                    currbtn.disabled = false;
                    avalon.log(ajax2.value + "," + mdtmain.message);
                    cindex = null;
                    ajax2 = null;
                } else {
                    mdtmain.messagecss = "warning";
                    mdtmain.message = prefix + ",Error:  数据为空,请刷新后再保存."

                }

            }

        }, function (vm) {
            avalon.log("加载vm2.");
        });
        //mdt_e
        mdtmain.mdt_e.$watch('mdt_nbr', function (a, b) {
            avalon.log(a + "," + b);
            mdtmain.initE("加载");
        });
        //init radio
        mdtmain.mdt_checkbox.mdt_Model_tmpA.$watch('other', function (a, b) {
            avalon.log(a + "," + b);
            if (a) {
                $("#mdt_Model_tmp1").attr("checked", false);
                $("#mdt_Model_tmp2").attr("checked", false);
                mdtmain.mdt_item.mdt_Model_tmp = a;
            }
            // avalon.log(mdtmain.mdt_checkbox);
        });
        mdtmain.mdt_checkbox.mdt_M_tmpA.$watch('other', function (a, b) {
            avalon.log(a + "," + b);
            if (a) {
                $("#mdt_M_tmp1").attr("checked", false);
                $("#mdt_M_tmp2").attr("checked", false);
                mdtmain.mdt_item.mdt_M_tmp = a;
            }
            //avalon.log(mdtmain.mdt_checkbox);
        });
        mdtmain.mdt_checkbox.def1A.$watch('other', function (a, b) {
            avalon.log(a + "," + b);
            if (a) {
                $("#def11").attr("checked", false);
                $("#def12").attr("checked", false);
                mdtmain.mdt_item.def1 = a;
            }
            //avalon.log(mdtmain.mdt_checkbox);
        });
        //         
        //end
        mdtmain.mdt_last.$watch('mdt_lastdesc1', function (a, b) {
            //avalon.log(a + ",1," + b);
            if (a) {
                mdtmain.mdt_last.mdt_lastdesc2 = false;
                mdtmain.mdt_last.mdt_lastdesc3 = false;
                mdtmain.mdt_last.mdt_lastdesc = "1.照用(用完为止)";
            } else {
                mdtmain.mdt_last.mdt_lastdesc = '';
            }
            //avalon.log(mdtmain.mdt_last.mdt_lastdesc);
        });
        mdtmain.mdt_last.$watch('mdt_lastdesc2', function (a, b) {
            //avalon.log(a + ",2," + b);
            if (a) {
                mdtmain.mdt_last.mdt_lastdesc1 = false;
                mdtmain.mdt_last.mdt_lastdesc3 = false;
                mdtmain.mdt_last.mdt_lastdesc = "2.报废";
            } else {
                mdtmain.mdt_last.mdt_lastdesc = '';
            }

            //avalon.log(mdtmain.mdt_last.mdt_lastdesc);
        });
        mdtmain.mdt_last.$watch('mdt_lastdesc3', function (a, b) {
            //avalon.log(a + ",3," + b);
            if (a) {
                mdtmain.mdt_last.mdt_lastdesc2 = false;
                mdtmain.mdt_last.mdt_lastdesc1 = false;
                mdtmain.mdt_last.mdt_lastdesc = "3.属客户付费用";
            } else {
                mdtmain.mdt_last.mdt_lastdesc = '';
            }

            //avalon.log(mdtmain.mdt_last.mdt_lastdesc);
        });
        mdtmain.initE("加载");
        avalon.scan();
    });