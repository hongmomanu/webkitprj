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
         'duty.DutyManagerWin',
         'duty.AddNewWorkWin',
         'duty.AddNewMissionWin',
         'duty.MissionManagerpanel',
         'duty.MissionManagerWin',
         'duty.WorkManagerpanel',
         'conmmon.AnimateWin'
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
            'dutypanel':{
              afterrender:function(panel){
                  var store=panel.getStore();
                  store.load();
                  //console.log(panel);
              }
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
            }
        });
        this.checkoutdutytaskinit();

    },
    checkdutytask:null,
    dutyalertinterval:60000,
    isfirstduty:true,

    checkoutdutytaskinit:function(){
        var me=this;
        Ext.getStore('duty.DutyMissions').on('load', function (store, options) {

            if(!me.checkdutytask){
                if(!localStorage.dutyalertinterval)localStorage.dutyalertinterval=me.dutyalertinterval;
                me.checkdutytask={
                    run: function(){
                        //me.refreshclick();
                        if(!me.isfirstduty){
                            store.load() ;

                        }else{
                            me.isfirstduty=false;
                        };
                    },
                    interval: parseInt(localStorage.dutyalertinterval)
                }
                Ext.TaskManager.start(me.checkdutytask);
            }else{
                me.dutyshowalert(store);

            }
            //alert(1);
        });
        Ext.getStore('duty.DutyMissions').load();
    },

    dutyshowalert:function(store){
        var items=store.data.items;
        var html='';
        for(var i=0;i<items.length;i++){
            var missionstatus= items[i].data.missionstatus;
            var time=items[i].data.missiontime;
            if(missionstatus==0&&time!=''){
                var datetime=Ext.Date.parse(time, "H:i");
                var now=new Date();
                if(datetime.getHours()<=now.getHours()){
                    html+=items[i].data.missionname+',未执行</br>';
                }

            }

        }
        if(!this.dutyalertwin){
            this.dutyalertwin=Ext.widget('alertmsgwin',{title: '值班任务提醒'});
        }
        if(html!==''){
            this.dutyalertwin.show();
            this.dutyalertwin.update(html);
        }

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
