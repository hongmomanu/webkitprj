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
         'duty.DutyConfigManagerWin',
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
            'dutypanel menuitem[action=dutymanager]':{
                click: this.opendutymanagerconfigwin
            },
            'dutyconfigmanagerwin button[action=save]': {
                click: this.savedutyconfig

            },
            'dutypanel':{
              afterrender:function(panel){
                  var store=panel.getStore();
                  store.load();
              },
              dutyclick:function(rec,grid){
                  var missioname=rec.get('missionname');
                  var eventMap={};
                  eventMap[missiontype.eqim]=Ext.bind(this.eqimclick,this);
                  eventMap[missiontype.record]=Ext.bind(this.recordclick,this);
                  eventMap[missiontype.waveform]=Ext.bind(this.waveformclick,this);
                  eventMap[missiontype.archivefile]=Ext.bind(this.archivefileclick,this);
                  eventMap[missiontype.cataloging]=Ext.bind(this.catalogingclick,this);
                  eventMap[missioname](rec,grid);
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

    completeduty:function(rec,grid){
       var params={
           id:rec.raw.id
       };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                grid.getStore().load();

            }else{
                Ext.Msg.alert("提示信息", "更新失败!");
            }

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "操作失败..!");
        };
        CommonFunc.ajaxSend(params,'duty/completeduty',successFunc,failFunc,'POST');

    },
    eqimclick:function(rec,grid){
        var me=this;
        //console.log(me);
        var params={
            id:rec.raw.id,
            username:localStorage.eqimusername,
            password:localStorage.eqimpassword,
            url:localStorage.eqimurl
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                var html=res.msg;
                me.completeduty(rec,grid);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.eqim,
                    logcontent:'今日无消息公示'}],'duty/senddutylogs');
            }else{
                Ext.Msg.alert("提示信息", "eqim 网络不通!");
            }

            //btn.up('panel').getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "操作失败..!");
        };
        CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
    },
    recordclick:function(rec){
      alert(2);
    },
    waveformclick:function(rec){
        alert(3);
    },
    archivefileclick:function(rec){
       alert(4);
    },
    catalogingclick:function(rec){
       alert(5);
    },
    savedutyconfig:function(btn){
        var form=btn.up('form');
        localStorage.dutyalertinterval=form.getValues().dutyalertinterval;
        localStorage.eqimurl=form.getValues().eqimurl;
        localStorage.eqimusername=form.getValues().eqimusername;
        localStorage.eqimpassword=form.getValues().eqimpassword;
        this.checkdutytask.interval=parseInt(localStorage.dutyalertinterval);
        btn.up('window').hide();
    },
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
    opendutymanagerconfigwin:function(btn){
        if(!this.dutyconfigmanagerwin)this.dutyconfigmanagerwin= Ext.widget('dutyconfigmanagerwin');
        this.dutyconfigmanagerwin.show();
        var form=this.dutyconfigmanagerwin.down('form').getForm();
        //testobj=this.systemalertmanagerwin.down('form');
        form.setValues(
            {
                dutyalertinterval:parseInt(localStorage.dutyalertinterval),
                eqimurl:localStorage.eqimurl,
                eqimusername:localStorage.eqimusername,
                eqimpassword:localStorage.eqimpassword
            });

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
