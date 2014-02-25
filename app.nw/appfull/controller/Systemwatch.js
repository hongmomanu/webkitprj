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
         'systemwatch.SystemManagerWin'
    ],
    models: [
         'systemwatch.SystemManager'
    ],
    stores: [
         'systemwatch.SystemManagers'
    ],

    init: function() {


        this.control({
            'systempanel menuitem[action=systemmanager]':{
                click: this.opensystemmanagerwin
            },
            'systemmanagerpanel button[action=new]':{
               click :this.addnewsystemwin
            },
            'addnewsystemwin button[action=add]':{
                click: this.addnewsystem
            },
            'systemmanagerpanel':{
                itemclick:this.systemclick
            },
            'systempanel':{
                afterrender:function(){
                    if (window.goSamples) goSamples();
                    var $ = go.GraphObject.make;
                    //myDiagram.redraw();
                    myDiagram =
                        $(go.Diagram, "SystemDiagram",
                            {
                                allowCopy: false,
                                isReadOnly:true,
                                allowDelete: false,
                                allowSelect:false,
                                allowDrop:false,
                                allowMove: false,
                                initialContentAlignment: go.Spot.Center

                            });
                    function load() {
                        var params={
                        };
                        var successFunc = function (response, action) {
                            var res = Ext.JSON.decode(response.responseText);
                            var results=res.results;
                            var firstitem={"key":"-1", "servername":"浙江省地震局","isping":true, "machinecss":""};
                            var nodearr=[];
                            nodearr.push(firstitem);
                            nodearr=nodearr.concat(results);
                            var linkDataArray=[];
                            for(var i=0;i<results.length;i++){
                                var linkitem={"from":results[i].key, "to":firstitem.key};
                                linkDataArray.push(linkitem);
                            }
                            myDiagram.model = go.Model.fromJson(
                                {
                                    "nodeDataArray":nodearr,
                                    "linkDataArray":linkDataArray
                                });

                        };
                        var failFunc = function (form, action) {
                            Ext.Msg.alert("提示信息", "获取服务失败!");
                        };
                        CommonFunc.ajaxSend(params,'serverlist',successFunc,failFunc,'GET');

                    }

                    function nodeTypeImage(type) {
                        if(type.isping){
                            if(type.key==-1)return "images/network.png";
                            else return "images/gnome_network_idle.png";
                        }else{
                            return "images/gnome_network_error.png";
                        }
                    }

                    function nodeProblemConverter(msg) {
                        if (!msg) return "red";
                    }

                    function nodeOperationConverter(s) {
                        if (s >= 2) return "TriangleDown";
                        if (s >= 1) return "Rectangle";
                        return "Circle";
                    }

                    function nodeStatusConverter(s) {
                        if (s.isping) return "green";
                        else return "red";
                    }

                    myDiagram.nodeTemplate =
                        $(go.Node, "Vertical",
                            { selectable: false},
                            { locationObjectName: "ICON" },
                            //new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                            $(go.Panel, "Spot",
                                $(go.Panel, "Auto",
                                    { name: "ICON" },
                                    /*$(go.Shape,
                                        { fill: null, stroke: null },
                                        new go.Binding("background", "isping", nodeProblemConverter)),*///错误背景
                                    $(go.Picture,
                                        { margin: 5 },
                                        new go.Binding("source", "", nodeTypeImage))
                                ),  // end Auto Panel
                               /* $(go.Shape, "Circle",
                                    { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
                                        width: 10, height: 10, fill: "orange" },
                                    new go.Binding("figure", "operation", nodeOperationConverter)),*/
                                $(go.Shape, "Circle",
                                    { alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
                                        width: 10, height: 10, fill: "blue" },
                                    new go.Binding("fill", "", nodeStatusConverter))
                            ),  // end Spot Panel
                            $(go.TextBlock,
                                new go.Binding("text","servername"))
                        );  // end Node
                    //节点的布局
                    myDiagram.layout = $(go.LayeredDigraphLayout,
                       { direction: 270, //拓扑图的方向
                         layerSpacing: 10,
                         columnSpacing: 15,
                         setsPortSpots: false
                       });

                    function linkProblemConverter(msg) {
                        if (msg) return "red";
                        return "black";
                    }

                    myDiagram.linkTemplate =
                        $(go.Link, go.Link.AvoidsNodes,
                            { corner: 3 },
                            $(go.Shape,
                                { strokeWidth: 2 },
                                new go.Binding("stroke", "problem", linkProblemConverter))
                        );

                    load();



                }
            }
        });
    },
    opensystemmanagerwin:function(btn){
        if(!this.systemmanagerwin)this.systemmanagerwin= Ext.widget('systemmanagerwin');
        this.systemmanagerwin.show();

    },
    addnewsystemwin:function(btn){
        if(!this.newsystemwin)this.newsystemwin= Ext.widget('addnewsystemwin');
        this.newsystemwin.show();
        var form_combobox=this.newsystemwin.down('combobox');
        var form_cssimg=this.newsystemwin.down('#machinecss');
        var win=this.systemmanagerwin;
        var panel=win.down('panel');
        var sm =panel.getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0||selectitem[0].data.id==-1){
            form_combobox.hide();
            form_cssimg.show();
        }else{
            form_combobox.show();
            form_cssimg.hide();
        }

    },
    addnewsystem:function(btn){
        var url='server/addserver';
        var me=this;
        var win=this.systemmanagerwin;
        var panel=win.down('panel');
        var sm =panel.getSelectionModel();
        var selectitem=sm.getSelection();
        var params={

        };
        if(selectitem.length==0){
            params.parentid=-1;
        }else{
            params.parentid=selectitem[0].data.id;
        }
        var successFunc = function (form, action) {
            var treepanel=me.systemmanagerwin.down('panel');
            treepanel.getStore().load({node:selectitem[0]});
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form,params,url,successFunc,failFunc,"正在提交。。。")
    }
    ,
    systemclick:function(grid, record){
        grid.up('panel').down('#del').enable()
    }


});
