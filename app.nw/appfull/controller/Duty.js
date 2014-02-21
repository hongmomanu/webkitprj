/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Duty', {
    extend: 'Ext.app.Controller',
    views: [
         'duty.Dutypanel',
         'duty.Systempanel',
         'duty.DutyManagerWin',
         'duty.AddNewWorkWin',
         'duty.AddNewMissionWin',
         'duty.MissionManagerpanel',
         'duty.MissionManagerWin',
         'duty.WorkManagerpanel'
    ],
    models: [
        'duty.DutyMission',
        'duty.User',
        'duty.MissionManager',
        'duty.WorkManager'
    ],
    stores: [
        'duty.DutyMissions',
        'duty.Users',
        'duty.MissionManagers',
        'duty.WorkManagers'
    ],

    init: function() {


        this.control({
            'dutypanel menuitem[action=workmanager]':{
                click: this.openworkmanagerwin
            },
            'dutypanel menuitem[action=missionmanager]':{
                click: this.openmissionmanagerwin
            },
            'workmanagerpanel':{
                itemclick:this.dutyclick
            },
            'workmanagerpanel button[action=new]':{
                click: this.addnewworkwin
            },
            'missionmanagerpanel button[action=new]':{
                click: this.addnewmissionwin
            },
            'addnewworkwin button[action=add]':{
                click: this.addnewduty
            },
            'addnewmissionwin button[action=add]':{
                click: this.addnewmission
            },
            'workmanagerpanel button[action=del]':{
                click: this.delduty
            },
            'systempanel':{
                afterrender:function(){
                    //alert(1);
                    if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
                    var $ = go.GraphObject.make;  // for conciseness in defining templates
                    //console.log(document.getElementById('myDiagram'));
                    myDiagram = $(go.Diagram, Ext.get('myDiagram').dom,  // create a Diagram for the DIV HTML element
                        { initialContentAlignment: go.Spot.Center });  // center the content

                    // define a simple Node template
                    myDiagram.nodeTemplate =
                        $(go.Node, "Auto",
                            $(go.Shape, "RoundedRectangle",
                                // Shape.fill is bound to Node.data.color
                                new go.Binding("fill", "color")),
                            $(go.TextBlock,
                                { margin: 3 },  // some room around the text
                                // TextBlock.text is bound to Node.data.key
                                new go.Binding("text", "key"))
                        );

                    // create the model data that will be represented by Nodes and Links
                    myDiagram.model = new go.GraphLinksModel(
                        [
                            { key: "服务器1", color: "lightblue" },
                            { key: "服务器2", color: "orange" },
                            { key: "服务器3", color: "lightgreen" },
                            { key: "服务器4", color: "pink" }
                        ],
                        [
                            { from: "服务器1", to: "服务器2" },
                            { from: "服务器2", to: "服务器3" },
                            { from: "服务器3", to: "服务器4" }
                        ]);

                    // enable Ctrl-Z to undo and Ctrl-Y to redo
                    // (should do this after assigning Diagram.model)
                    myDiagram.undoManager.isEnabled = true;


                }
            }
        });
    },


    openworkmanagerwin:function(btn){
        if(!this.workmanagerwin)this.workmanagerwin= Ext.widget('dutymanagerwin');
        this.workmanagerwin.show();

    },
    openmissionmanagerwin:function(btn){
        if(!this.missionmanagerwin)this.missionmanagerwin= Ext.widget('missionmanagerwin');
        this.missionmanagerwin.show();
    },
    addnewmissionwin:function(btn){
        if(!this.newmissionwin)this.newmissionwin= Ext.widget('addnewmissionwin');
        this.newmissionwin.show();
    },
    addnewworkwin:function(btn){
        if(!this.newworkwin)this.newworkwin= Ext.widget('addnewworkwin');
        this.newworkwin.show();
    },
    dutyclick:function(grid, record){
        grid.up('panel').down('#del').enable()
    },
    delduty:function(btn){
        var sm = btn.up('panel').getSelectionModel();
        var selectitem=sm.getSelection();
        var enumids=[];
        for(var i=0;i<selectitem.length;i++){
            enumids.push(selectitem[i].data.enumid);
        }
        var params={
            enumids:enumids
        };
        var successFunc = function (response, action) {
            btn.up('panel').getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "删除失败!");
        };
        CommonFunc.ajaxSend(params,'delenumbyid',successFunc,failFunc,'POST');
    },
    addnewmission:function(btn){
        var url='addnewmission';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.missionmanagerwin.down('grid');
            grid.getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };
        var form = btn.up('form');
        CommonFunc.formSubmit(form,{},url,successFunc,failFunc,"正在提交。。。")

    },
    addnewduty:function(btn){
        var url='addnewduty';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.workmanagerwin.down('grid');
            grid.getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息",action.result.msg);
        };
        var form = btn.up('form');
        CommonFunc.formSubmit(form,{},url,successFunc,failFunc,"正在提交。。。")
    }

});
