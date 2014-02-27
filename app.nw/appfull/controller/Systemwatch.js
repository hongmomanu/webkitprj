/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Systemwatch', {
    extend: 'Ext.app.Controller',
    views: [
        'systemwatch.Systempanel',
        'systemwatch.SystemManagerpanel',
        'systemwatch.AddNewSystemWin',
        'systemwatch.SystemManagerWin',
        'systemwatch.SystemAlertManagerWin'
    ],
    models: [
        'systemwatch.SystemManager'
    ],
    stores: [
        'systemwatch.SystemManagers'
    ],
    alertinterval:60000,
    alertmempercent:5,
    alertdiskpercent:10,
    init: function () {


        this.control({
            'systempanel menuitem[action=systemmanager]': {
                click: this.opensystemmanagerwin
            },'systempanel menuitem[action=systemalertmanager]': {
                click: this.opensystemalertmanagerwin
            },
            'systempanel image': {
                refreshclick: this.refreshclick
            },
            'systemmanagerpanel button[action=new]': {
                click: this.addnewsystemwin
            },
            'systemalertmanagerwin button[action=save]': {
                click: this.savesystemalertconfig

            },
            'addnewsystemwin button[action=add]': {
                click: this.addnewsystem
            },
            'systemmanagerpanel': {
                itemclick: this.systemclick
            },
            'systempanel': {
                afterrender: function () {
                    this.initsystemdiagram();
                }
            }
        });
    },
    refreshclick:function(btn){
        var msgwin = Ext.getCmp('logtmsgwin');
        if(msgwin){
            var store = msgwin.down('grid').getStore();
            store.removeAll();
        }

        this.loadsystemdata();
    },
    loadsystemdata: function () {
        var me = this;
        var params = {
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            var results = res.results;
            var msgwin = Ext.getCmp('logtmsgwin');
            if (!msgwin) {
                msgwin = Ext.widget('alertmsgcornershowwin', {title: '警告窗口'});
            }
            var store = msgwin.down('grid').getStore();
            var isalert=false;
            for (var i = 0; i < results.length; i++) {
                if (!results[i].isping) {
                    isalert=true;
                    msgwin.flyIn();
                    store.insert(0,
                        {
                            msg: "网络异常",
                            ip:results[i].servername + "(" + results[i].servervalue + ")",
                            msgtime: Ext.util.Format.date(new Date(), "H:i"),
                            status:'ping'
                        });

                } else {
                    if(results[i].mem!==""&&results[i].mem*100<localStorage.alertmempercent){
                        msgwin.flyIn();
                        store.insert(0,
                            {
                                msg: "内存危机:"+(results[i].mem*100).toFixed(1)+"%",
                                msgtime: Ext.util.Format.date(new Date(), "H:i"),
                                ip:results[i].servername + "(" + results[i].servervalue + ")",
                                status:'mem'
                            });
                    }
                    Ext.each(results[i].apps, function (item, index) {
                        if (!item.isconnect) {
                            isalert=true;
                            msgwin.flyIn();
                            store.insert(0,
                                {
                                    msg: "服务异常:" + item.servername,
                                    msgtime: Ext.util.Format.date(new Date(), "H:i"),
                                    ip:results[i].servername + "(" + results[i].servervalue + ")",
                                    status:'app'
                                });
                        }
                    });
                }
            }
            if(isalert){
                if(!me.alertsnd){
                    me.alertsnd=new Audio("audio/song.ogg");
                }
                me.alertsnd.play();
            }
            var firstitem = {"key": "-1", "servername": "浙江省地震局", "isping": true, "machinecss": ""};
            var nodearr = [];
            nodearr.push(firstitem);
            nodearr = nodearr.concat(results);
            var linkDataArray = [];
            for (var i = 0; i < results.length; i++) {
                var linkitem = {"from": results[i].key, "to": firstitem.key,"color":results[i].isping?"green":"red"};
                linkDataArray.push(linkitem);
            }
            me.myDiagram.model = new go.GraphLinksModel(nodearr,linkDataArray);

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取服务失败!");
        };
        CommonFunc.ajaxSend(params, 'serverlist', successFunc, failFunc, 'GET');

    },
    initsystemdiagram: function () {
        var me = this;
        var $ = go.GraphObject.make;
        //myDiagram.redraw();
        this.myDiagram =
            $(go.Diagram, "SystemDiagram",
                {
                    contentAlignment: go.Spot.Center,
                    initialContentAlignment: go.Spot.Center,
                    autoScale: go.Diagram.Uniform,
                    isReadOnly: true
                });

        // Make sure the infoBox is momentarily hidden if the user tries to mouse over it
        var infoBoxH = document.getElementById("SysteminfoBox");
        infoBoxH.addEventListener("mousemove", function () {
            var box = document.getElementById("SysteminfoBox");
            box.style.left = parseInt(box.style.left) + "px";
            box.style.top = parseInt(box.style.top) + 30 + "px";
        }, false);

        var diagramDiv = document.getElementById("SystemDiagram");
        // Make sure the infoBox is hidden when the mouse is not over the Diagram
        diagramDiv.addEventListener("mouseout", function (e) {
            if (me.lastStroked != null) me.lastStroked.background = null;
            me.lastStroked = null;

            var infoBox = document.getElementById("infoBox");
            var elem = document.elementFromPoint(e.clientX, e.clientY);
            if (elem === infoBox || elem.parentNode === infoBox) {
                var box = document.getElementById("SysteminfoBox");
                box.style.left = parseInt(box.style.left) + "px";
                box.style.top = parseInt(box.style.top) + 30 + "px";
            } else {
                var box = document.getElementById("SysteminfoBox");
                box.innerHTML = "";
            }
        }, false);

        this.myDiagram.nodeTemplate =
            $(go.Node, "Vertical",
                {
                    selectable: false,
                    mouseOver: function (e, obj) {
                        me.highlightNode(e, obj)
                    }
                },
                { locationObjectName: "ICON" },
                //new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel, "Spot",
                    $(go.Panel, "Auto",
                        { name: "ICON" },
                        /*$(go.Shape,
                         { fill: null, stroke: null },
                         new go.Binding("background", "isping", nodeProblemConverter)),*///错误背景
                        $(go.Picture,
                            { margin: 5, name: 'Picture' },
                            new go.Binding("source", "", me.nodeTypeImage))
                    ),  // end Auto Panel
                    /* $(go.Shape, "Circle",
                     { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
                     width: 10, height: 10, fill: "orange" },
                     new go.Binding("figure", "operation", nodeOperationConverter)),*/
                    $(go.Shape, "Circle",
                        { alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
                            width: 10, height: 10, fill: "blue" },
                        new go.Binding("fill", "", me.nodeStatusConverter))
                ),  // end Spot Panel
                $(go.TextBlock,
                    new go.Binding("text", "servername"))
            );  // end Node
        //节点的布局
        this.myDiagram.layout = $(go.LayeredDigraphLayout,
            { direction: 270, //拓扑图的方向
                layerSpacing: 10,
                columnSpacing: 15,
                setsPortSpots: false
            });

        this.myDiagram.linkTemplate =
            $(go.Link, go.Link.AvoidsNodes,
                { corner: 3 },
                $(go.Shape,
                    { strokeWidth: 2 },
                    new go.Binding("stroke", "color"))  // me.linkProblemConverter
            );
        if(!me.alertTask){
            if(!localStorage.alertinterval)localStorage.alertinterval=me.alertinterval;
            if(!localStorage.alertmempercent)localStorage.alertmempercent=me.alertmempercent;
            if(!localStorage.alertdiskpercent)localStorage.alertdiskpercent=me.alertdiskpercent;
            me.alertTask={
                run: function(){
                    me.refreshclick();
                },
                interval: parseInt(localStorage.alertinterval)
            }
        }
        Ext.TaskManager.start(me.alertTask);

    },
    nodeProblemConverter: function (msg) {
        if (!msg) return "red";
    },


    updateInfoBox: function (mousePt, data) {
        var all_arr = data.apps;
        var connected_arr = Ext.Array.filter(all_arr, function (item, index, array) {
            return item.isconnect
        });

        var x = "<div id='infoBox'>" +
            "<div> 状态描述:</div>" +
            "<div class='infoTitle'>ip地址</div>" +
            "<div class='infoValues'>" + data.servervalue + "</div>" +
            "<div class='infoTitle'>连接状态</div>" +
            "<div class='infoValues'>" + (data.isping ? '正常' : '断开') + "</div>" +
            (data.cpu === "" ? "" : ("<div class='infoTitle'>cpu占用率</div>" +
                "<div class='infoValues'>" + data.cpu + "</div>")) +
            "<div class='infoTitle'>服务状态</div>" +
            "<div class='infoValues'>" +
            ((data.isping && all_arr.length == connected_arr.length) ? ("所有服务正常")
                : "有" + (all_arr.length - connected_arr.length) + "个服务异常")
            + "</div>" +
            "</div>";
        var box = document.getElementById("SysteminfoBox");
        box.innerHTML = x;
        box.style.left = mousePt.x + "px";
        box.style.top = mousePt.y + 20 + "px";
    },

    highlightNode: function (e, node) {
        var me = this;
        if (node !== null) {
            var picture = node.findObject("Picture");
            picture.background = "#D0D3D4";
            if (me.lastStroked != null && me.lastStroked != picture) me.lastStroked.background = null;
            me.lastStroked = picture;


            me.updateInfoBox(e.viewPoint, node.data);
        } else {
            if (me.lastStroked != null) me.lastStroked.background = null;
            me.lastStroked = null;
            document.getElementById("SysteminfoBox").innerHTML = "";
        }
    },
    nodeOperationConverter: function (s) {
        if (s >= 2) return "TriangleDown";
        if (s >= 1) return "Rectangle";
        return "Circle";
    },
    nodeTypeImage: function (type) {
        if (type.isping) {
            if (type.key == -1)return "images/network.png";
            else return "images/gnome_network_idle.png";
        } else {
            return "images/gnome_network_error.png";
        }
    },
    nodeStatusConverter: function (s) {
        var all_arr = s.apps;
        var connected_arr = Ext.Array.filter(all_arr, function (item, index, array) {
            return item.isconnect
        });
        if (s.isping && all_arr.length == connected_arr.length) {
            return "green";
        } else return "red";
    },
    linkProblemConverter: function (msg) {
        if (msg) return "red";
        return "black";
    },
    opensystemmanagerwin: function (btn) {
        if (!this.systemmanagerwin)this.systemmanagerwin = Ext.widget('systemmanagerwin');
        this.systemmanagerwin.show();

    },
    opensystemalertmanagerwin:function(btn){
        if (!this.systemalertmanagerwin){
            this.systemalertmanagerwin = Ext.widget('systemalertmanagerwin');
        }

        this.systemalertmanagerwin.show();
        var form=this.systemalertmanagerwin.down('form').getForm();
        //testobj=this.systemalertmanagerwin.down('form');
        form.setValues(
            {
                alertinterval:parseInt(localStorage.alertinterval),
                alertdiskpercent:parseInt(localStorage.alertdiskpercent),
                alertmempercent:parseInt(localStorage.alertmempercent)
            });

    },
    savesystemalertconfig:function(btn){
        var form=btn.up('form');
        localStorage.alertinterval=form.getValues().alertinterval;
        localStorage.alertmempercent=form.getValues().alertmempercent;
        localStorage.alertdiskpercent=form.getValues().alertdiskpercent;
        this.alertTask.interval=parseInt(localStorage.alertinterval);
        btn.up('window').hide();
    },
    addnewsystemwin: function (btn) {
        if (!this.newsystemwin)this.newsystemwin = Ext.widget('addnewsystemwin');
        this.newsystemwin.show();
        var form_combobox = this.newsystemwin.down('combobox');
        var form_cssimg = this.newsystemwin.down('#machinecss');
        var form_password = this.newsystemwin.down('#password');
        var form_username = this.newsystemwin.down('#username');
        var win = this.systemmanagerwin;
        var panel = win.down('panel');
        var sm = panel.getSelectionModel();
        var selectitem = sm.getSelection();
        if (selectitem.length == 0 || selectitem[0].data.id == -1) {
            form_combobox.hide();
            form_cssimg.show();
            form_password.show();
            form_username.show();
        } else {
            form_combobox.show();
            form_cssimg.hide();
            form_password.hide();
            form_username.hide();
        }

    },
    addnewsystem: function (btn) {
        var url = 'server/addserver';
        var me = this;
        var win = this.systemmanagerwin;
        var panel = win.down('panel');
        var sm = panel.getSelectionModel();
        var selectitem = sm.getSelection();
        var params = {

        };
        if (selectitem.length == 0) {
            params.parentid = -1;
        } else {
            params.parentid = selectitem[0].data.id;
        }
        var successFunc = function (form, action) {
            var treepanel = me.systemmanagerwin.down('panel');
            treepanel.getStore().load({node: selectitem[0]});
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", action.result.msg);
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form, params, url, successFunc, failFunc, "正在提交。。。")
    },
    systemclick: function (grid, record) {
        grid.up('panel').down('#del').enable()
    }


});
