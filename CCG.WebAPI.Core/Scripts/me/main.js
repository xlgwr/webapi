'use strict';

require.config({
    baseUrl: '/Lib',
    paths: {
        jquery: './jquery/dist/jquery',
        ligerUI: './ligerUI/js/ligerui.all',
        avalon: "./avalon/avalon.shim", //必须修改源码 Or shim，禁用自带加载器，或直接删提AMD加载器模块


        text: './text/text',
        domReady: './domReady/domReady',
        css: './require-css/css',
        mdtMain: '/Scripts/me/avalon.mdtMain',
        //config
        //config: '../config/config',
        //ajax
        mmPromise: './mm-request/public/mmPromise',
        mmRequest: './mm-request/public/mmRequest',
        //getmodel

        getModel: './oniui//avalon.getModel'
        //oniui
        //datepicker: './oniui/datepicker/avalon.datepicker',
        //dropdown: './oniui/dropdown/avalon.dropdown',
        //slider: './oniui/slider/avalon.slider',

    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        ligerUI: {
            exports: "ligerUI"
        },
        avalon: {
            exports: "avalon"
        },
        mdtMain: {
            exports: "mdtMain"
        },
        mmPromise: {
            exports: "mmPromise"
        },
        mmRequest: {
            exports: "mmRequest"
        },
        getModel: {
            exports: "getModel"
        }
        //oniui
        //dropdown: {
        //    exports: "dropdown"
        //},
        //slider: {
        //    exports: "slider"
        //},
        //datepicker: {
        //    exports: "datepicker"
        //    //deps: ["dropdown", "slider"]
        // }

    }
});
require(['avalon', 'jquery', 'domReady!'], function (avalon, jquery) {//第二块，添加根VM（处理共用部分）	
    avalon.log("加载avalon完毕，开始构建根VM与加载其他模块")

    //第三块，加载其他模块
    require(["ligerUI"], function () {
        $(function () {
            avalon.log("start jquery.");

            $("#tabsone").ligerTab({
                onAfterSelectTabItem: function (a) {
                    //console.log(a);    
                    if (a === 1) {

                    }
                }
            });
            var $tabsone = $("#tabsone").ligerGetTabManager();
            $tabsone.selectTabItem('1');
         
           //set default focus
            $("#mdt_type").focus();
        })
    });

    //第三块，加载其他模块
    require(['mdtMain', 'getModel',
        "/Lib/oniui/datepicker/avalon.datepicker.js"
    ], function () {
        avalon.log("加载其他完毕mdtMain");

    });

    avalon.scan();
});


