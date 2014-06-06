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
        'systemwatch.EditSystemWin',
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


        //alert(resoreceurl);
        //this.alertsnd=new Audio(resoreceurl);
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
            'systemmanagerpanel button[action=edit]': {
                click: this.editsystemwin
            },'systemmanagerpanel button[action=del]': {
                click: this.delsystem
            },
            'systemalertmanagerwin button[action=save]': {
                click: this.savesystemalertconfig

            },
            'addnewsystemwin button[action=add]': {
                click: this.addnewsystem
            },
            'editsystemwin button[action=save]': {
                click: this.savesystem
            },
            'systemmanagerpanel': {
                itemclick: this.systemclick
            },
            'logmsgrid':{
                afterrender:function(panel){
                    var store=panel.getStore();
                    store.on('datachanged',function(item){
                        var content=$('.alert-isnot');
                        content.unbind( "click" );
                        content.click(function(){
                                //alert(1);
                                if($(this).css("color")=='rgb(0, 128, 0)'){
                                    AlertContent[$(this).attr("typevalue")]=true;
                                    $(this).css("color","red");
                                    $(this).text('不报警');
                                }
                                else{
                                    AlertContent[$(this).attr("typevalue")]=false;
                                    $(this).css("color","green");
                                    $(this).text('报警');
                                }

                            }
                        );
                    })
                    /*store.load({callback:function(){
                        var task = new Ext.util.DelayedTask(function(){
                            $('.alert-isnot').click(function(){
                                if($(this).css("color")=='green'){
                                    AlertContent[$(this).attr("typevalue")]=true;
                                    $(this).css("color","red");
                                    $(this).val('不报警');
                                 }
                                else{
                                    AlertContent[$(this).attr("typevalue")]=false;
                                    $(this).css("color","green");
                                    $(this).val('报警');
                                }

                            }
                            );
                        });
                        task.delay(500);

                    }});*/
            }},
            'systempanel': {
                afterrender: function () {
                    this.initsystemdiagram();
                },
                resize:function(){
                    this.myDiagram.redraw();
                }
            }
        });
    },
    refreshclick:function(btn){
        var msggrid = Ext.getCmp('logmsgrid');
        if(msggrid){
            var store = msggrid.getStore();
            store.removeAll();
        }

        this.loadsystemdata();
    },

    sendsystemlogs:function(systemlogs,url){
        var params={
            systemlogs:Ext.JSON.encode(systemlogs)
        };
        var successFunc = function (response, action) {

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "失败!");
        };
        CommonFunc.ajaxSend(params,url,successFunc,failFunc,'POST');
    },

    pingexception:function(item,store,msggrid){
        var content=item.servername + "(" + item.servervalue + ")";
        var msg=exceptiontype.ping;

        if(!AlertContent[content+msg.replace(/\d+%/,"")+'ping'])this.isalert=true;
        //msggrid.flyIn();
        store.insert(0,
            {
                msg: msg,
                ip:content,
                msgtime: Ext.util.Format.date(new Date(), "H:i"),
                status:'ping'
            });
        this.sendlog_arr.push(
            {
                serverid:item.key,
                statustype:exceptiontype.ping,
                logcontent:"无法ping通:"+item.servervalue
            });
    },
    appexception:function(item,itemchild,store,msggrid){

        if (!itemchild.isconnect) {
            var content=item.servername + "(" + item.servervalue + ")";
            var msg=exceptiontype.app+":" + itemchild.servername;
            if(!AlertContent[content+msg.replace(/\d+%/,"")+'app'])this.isalert=true;
            //msgwin.flyIn();
            store.insert(0,
                {
                    msg: msg,
                    msgtime: Ext.util.Format.date(new Date(), "H:i"),
                    ip:content,
                    status:'app'
                });
            this.sendlog_arr.push(
                {
                    serverid:item.key,
                    statustype:exceptiontype.app,
                    logcontent:itemchild.servername
                });
            //this.sendsystemlog(item.key,exceptiontype.app,itemchild.servername);
        }
    },
    diskexception:function(item,store,msggrid){
         if(item.disk.length>0){
            for(var i=0;i<item.disk.length;i++){
                if((100-parseFloat(item.disk[i].value))<parseFloat(localStorage.alertdiskpercent)){
                    var content=item.disk[i].name + "(" + item.servervalue + ")";
                    var msg=exceptiontype.disk+":"+item.disk[i].value;
                    if(!AlertContent[content+msg.replace(/\d+%/,"")+'disk'])this.isalert=true;
                    //msgwin.flyIn();
                    store.insert(0,
                        {
                            msg:msg ,
                            msgtime: Ext.util.Format.date(new Date(), "H:i"),
                            ip:content,
                            status:'disk'
                        });
                    this.sendlog_arr.push(
                        {
                            serverid:item.key,
                            statustype:exceptiontype.disk,
                            logcontent:item.disk[i].name+":"+item.disk[i].value+
                                "(" + item.servervalue + ")"
                        });
                }

            }

         }
    },
    memoryexception:function(item,store,msggrid){
        if(item.mem!==""&&item.mem*100<localStorage.alertmempercent){
            var content=item.servername + "(" + item.servervalue + ")";
            var msg= exceptiontype.mem+":"+((1-item.mem)*100).toFixed(1)+"%";
            if(!AlertContent[content+msg.replace(/\d+%/,"")+'mem'])this.isalert=true;
            //msgwin.flyIn();
            store.insert(0,
                {
                    msg: msg,
                    msgtime: Ext.util.Format.date(new Date(), "H:i"),
                    ip:content,
                    status:'mem'
                });
            this.sendlog_arr.push(
                {
                    serverid:item.key,
                    statustype:exceptiontype.mem,
                    logcontent:"内存空闲:"+(item.mem*100).toFixed(1)+"%("+item.servervalue
                        +")"
                });
            }
    },
    loadsystemdata: function () {
        var me = this;
        var params = {
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            var results = res.results;
            /*var msgwin = Ext.getCmp('logtmsgwin');
            if (!msgwin) {
                msgwin = Ext.widget('alertmsgcornershowwin', {title: '警告窗口'});
            }
            var store = msgwin.down('grid').getStore();*/
            var msggrid=Ext.getCmp('logmsgrid');
            var store=msggrid.getStore();
            me.sendlog_arr=[];
            for (var i = 0; i < results.length; i++) {
                me.isalert=false;
                if (!results[i].isping) {

                    me.pingexception(results[i],store,msggrid);

                } else {

                    me.memoryexception(results[i],store,msggrid);
                    me.diskexception(results[i],store,msggrid);

                    Ext.each(results[i].apps, function (item, index) {

                        me.appexception(results[i],item,store,msggrid);

                    });
                }
                if(!me.isalert){
                    me.sendlog_arr.push(
                        {
                            serverid:results[i].key,
                            statustype:exceptiontype.ok,
                            logcontent:"所有服务:"+exceptiontype.ok+"("+results[i].servervalue+")"
                        });
                }else{
                    //if(me.alertsnd)me.alertsnd.pause();
                    //me.alertsnd.play();
                    var resoreceurl=localStorage.serverurl+"audio/server.ogg";
                    var play=new Audio(resoreceurl);
                    play.play();
                }
            }


            me.sendsystemlogs(me.sendlog_arr,'server/sendsystemlogs');
            var firstitem = {"key": "-1", "servername": "浙江省地震台网中心", "isping": true, "machinecss": ""};
            var nodearr = [];
            nodearr.push(firstitem);
            nodearr = nodearr.concat(results);
            var linkDataArray = [];
            for (var i = 0; i < results.length; i++) {
                var linkitem = {"from": results[i].key, "to": firstitem.key,"color":results[i].isping?"green":"red"};
                linkDataArray.push(linkitem);
            }
            me.myDiagram.model = new go.GraphLinksModel(nodearr,linkDataArray);
            me.myDiagram.redraw();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取服务失败!");
        };
        CommonFunc.ajaxSend(params, 'serverlist', successFunc, failFunc, 'GET');

    },
    nodeServerClick:function(e,node){
        var os = require("os");
        var c = require('child_process');
        var platform=os.platform();

        if(platform.indexOf('linux')>=0){
            c.exec('xfce4-terminal  -x bash -c "ssh '+node.data.username+'@'+node.data.servervalue+'; exec bash"')
        }else if(platform.indexOf('windows')>=0){
            c.exec('cmd.exe /c start ssh '+node.data.username+'@'+node.data.servervalue);
        }else{
            var cmd ='osascript -e \'tell app \"Terminal\" \n do script \"ssh ' +node.data.username+'@'+node.data.servervalue+'\" \n end tell\' ';
            c.exec(cmd);
        }
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
                {click:me.nodeServerClick},
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
                "<div class='infoValues'>" + (eval(data.cpu)).toFixed(2) + "%</div>")) +
            (data.mem === "" ? "" : ("<div class='infoTitle'>内存占用率</div>" +
                "<div class='infoValues'>" + ((1-data.mem)*100).toFixed(1) + "%</div>")) +
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
        var url=CommonFunc.geturl();
        /*if (type.isping) {
            if (type.key == -1)return "images/network.png";
            else return "images/gnome_network_idle.png";
        } else {
            return "images/gnome_network_error.png";
        }*/
        if (type.machinecss==='blade') {
             return url+"images/server_eteint_vert.png";
        }else if (type.key == -1)return "images/network.png";
        else {
            return url+"images/network_server.png";
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
    delsystem:function(btn){
        var panel=btn.up('panel');
        var sm = panel.getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        Ext.MessageBox.confirm('提示', '确定删除选中服务?', function showResult(btn){
            if(btn=='yes'){
               // console.log(selectitem[0].data);
                var params = {
                    serverid:selectitem[0].data.id
                };
                var successFunc = function (response, action) {
                    var res = Ext.JSON.decode(response.responseText);
                    if(res.success){
                        panel.getStore().load();
                    }

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息", "删除任务失败!");
                };
                CommonFunc.ajaxSend(params, 'server/delserver', successFunc, failFunc,'POST');
            }
        });
    },
    editsystemwin:function(btn){
        if (!this.editsystem_win)this.editsystem_win = Ext.widget('editsystemwin');
        this.editsystem_win.show();
        var form_combobox = this.editsystem_win.down('combobox');
        var form_cssimg = this.editsystem_win.down('#machinecss');
        var form_password = this.editsystem_win.down('#password');
        var form_username = this.editsystem_win.down('#username');
        var win = this.systemmanagerwin;
        var panel = win.down('panel');
        var sm = panel.getSelectionModel();
        var selectitem = sm.getSelection();
        if (selectitem[0].data.parentId == -1) {
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
        var form=this.editsystem_win.down('form').getForm();
        form.setValues(selectitem[0].raw);

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
    savesystem:function(btn){
        var url = 'server/saveserver';
        var me = this;
        var win = this.systemmanagerwin;
        var panel = win.down('panel');
        var sm = panel.getSelectionModel();
        var selectitem = sm.getSelection();
        var params = {
            id : selectitem[0].data.id
        };

        var successFunc = function (form, action) {
            var treepanel = me.systemmanagerwin.down('panel');
            btn.up('window').hide();
            treepanel.getStore().load({node: selectitem[0].parentNode});
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", action.result.msg);
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form, params, url, successFunc, failFunc, "正在提交。。。")
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
        grid.up('panel').down('#del').enable();
        grid.up('panel').down('#edit').enable();
    }


});
