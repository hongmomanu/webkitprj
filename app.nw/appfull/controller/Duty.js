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
         'duty.AddNewStationWin',
         'duty.AddNewMissionWin',
         'duty.EditMissionItemWin',
         'duty.MissionManagerpanel',
         'duty.StationManagerpanel',
         'duty.MissionManagerWin',
         'duty.WaveformCopyWin',
         'duty.ArchiveFileWin',
         'duty.WorkManagerpanel',
         'duty.DutyConfigManagerWin',
         'duty.StationManagerConfigwin',
         'conmmon.AnimateWin'
    ],
    models: [
        'duty.DutyMission',
        'duty.MissionManager',
        'duty.StationManager',
        'duty.WorkManager'
    ],
    stores: [
        'duty.DutyMissions',
        'duty.MissionManagers',
        'duty.WorkManagers',
        'duty.StationManagers',
        'duty.WorkManagerEvents'
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
            'dutypanel menuitem[action=stationmanager]':{
                click: this.openstationmanagerconfigwin
            },
            'dutypanel menuitem[action=logout]':{
                click: this.logoutsystem
            },
            'dutyconfigmanagerwin button[action=save]': {
                click: this.savedutyconfig
            },
            'editmissionitemwin button[action=save]': {
                click: this.savemissionconfig
            },
            'dutypanel':{
              afterrender:function(panel){
                  var store=panel.getStore();
                  store.load();
              },
              dutyclick:function(rec,store){
                  var missionname=rec.get('missionname');
                  Ext.Msg.wait('处理中，请稍后...', '提示');
                  this.getEventMap()[missionname](rec,store);
              }
            },
            'workmanagerpanel':{
                itemclick:this.dutyclick
            },
            'workmanagerpanel button[action=new]':{
                click: this.addnewworkwin
            },

            'waveformcopywin button[action=copy]':{
                click: this.copywaveform
            },
            'archivefilewin button[action=check]':{
                click: this.checkarchive
            },
            'stationmanagerpanel button[action=new]':{
                click: this.addnewstationwin
            },
            'missionmanagerpanel button[action=new]':{
                click: this.addnewmissionwin
            },
            'missionmanagerpanel button[action=edit]':{
                click: this.editmissionwin
            },
            'addnewstationwin button[action=add]':{
                click: this.addnewstation
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

    completeduty:function(item,store,dutylog){
       var params={
           id:item.raw.id,
           dutylog:dutylog
       };
        var successFunc = function (response, action) {
            Ext.Msg.hide();
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                //store.load();
                item.set({missionstatus: 1,time:Ext.util.Format.date(new Date(), 'Y-m-d H:i:s'),dutylog:dutylog})

            }else{
                Ext.Msg.alert("提示信息", "检查失败!");
            }


        };
        var failFunc = function (form, action) {
            Ext.Msg.hide();
            Ext.Msg.alert("提示信息", "操作失败..!");

        };
        CommonFunc.ajaxSend(params,'duty/completeduty',successFunc,failFunc,'POST');

    },

    eqimclick:function(item,store){
        var me=this;
        //console.log(me);
        var params={
            id:item.raw.id,
            username:localStorage.eqimusername,
            password:localStorage.eqimpassword,
            url:localStorage.eqimurl,
            securl:"http://192.168.2.141:8080/jz"
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                var html=res.msg;
                me.completeduty(item,store,missiontype.eqimsucc);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.eqimsucc,
                    logcontent:missiontype.eqimsucc}],'duty/senddutylogs');
            }else{
                //Ext.Msg.alert("提示信息", "eqim 网络不通!");
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.eqimfail,
                    logcontent:"eqim 网络不通!"}],'duty/senddutylogs');
            }

            //btn.up('panel').getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "操作失败..!");
        };
        CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
    },
    recordclick:function(rec){
      //alert(2);断记上传
      Ext.MessageBox.confirm('接口未实现', '', function showResult(btn){
          Ext.Msg.hide();
      });

    },
    waveformclick:function(rec,store){
        var me=this;
        var params={
            sourcedir:localStorage.sourcedir,
            targetdir:localStorage.targetdir
        };
        var successFunc = function (forms, action) {
            me.completeduty(rec,store,missiontype.waveformsucc);
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([{userid:Globle.userid,
                statustype:missiontype.waveformsucc,
                logcontent:missiontype.waveformsucc}],'duty/senddutylogs');
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "源目录不存在");
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([{userid:Globle.userid,
                statustype:missiontype.waveformfail,
                logcontent:"源目录不存在"}],'duty/senddutylogs');
        };

        CommonFunc.ajaxSend(params,'duty/copywavefile',successFunc,failFunc,'POST');

    },
    earthquickfileclick:function(rec,store){
        var me=this;
        var params={
            sourcedir:localStorage.sourcedir,
            earthplatformlist:localStorage.earthplatformlist,
            archiveminsize:localStorage.archiveminsize
        };

        var successFunc = function (response, action) {

            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                me.completeduty(rec,store,missiontype.archivefilesucc);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.earthquicksucc,
                    logcontent:missiontype.earthquicksucc}],'duty/senddutylogs');
            }else{
                me.completeduty(rec,store,missiontype.archivefilefail+'<br>'+res.results.join("<br>"));
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([
                    {
                        userid:Globle.userid,
                        statustype:missiontype.earthquickfail,
                        logcontent:res.results.join(",")
                    }
                ],'duty/senddutylogs');
            }

        };
        var failFunc = function (response, action) {
            //Ext.Msg.alert("文件异常", action.result.results);
            //var res = Ext.JSON.decode(response.responseText);

        };
        CommonFunc.ajaxSend(params,'duty/checkarchive',successFunc,failFunc,'POST');

    },
    archivefileclick:function(rec,store){

        var me=this;
        var params={
            sourcedir:localStorage.sourcedir,
            earthplatformlist:localStorage.earthplatformlist,
            archiveminsize:localStorage.archiveminsize
        };

        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                me.completeduty(rec,store,missiontype.archivefilesucc);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.archivefilesucc,
                    logcontent:missiontype.archivefilesucc}],'duty/senddutylogs');
            }
            else{
                me.completeduty(rec,store,missiontype.archivefilefail+'<br>'+res.results.join("<br>"));
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([
                    {
                        userid:Globle.userid,
                        statustype:missiontype.archivefilefail,
                        logcontent:res.results.join(",")
                    }
                ],'duty/senddutylogs');
            }

        };
        var failFunc = function (response, action) {
            //Ext.Msg.alert("文件异常", action.result.results);


        };
        CommonFunc.ajaxSend(params,'duty/checkarchive',successFunc,failFunc,'POST');

    },
    catalogingreportclick:function(item,store){
        var me=this;
        //console.log(me);
        var params={
            id:item.raw.id,
            username:localStorage.eqimusername,
            password:localStorage.eqimpassword,
            url:localStorage.eqimurl,
            securl:"http://192.168.2.141:8080/jz"
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                var html=res.msg;
                me.completeduty(item,store,missiontype.catalogingreportsucc);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.catalogingreportsucc,
                    logcontent:missiontype.catalogingreportsucc}],'duty/senddutylogs');
            }else{
                //Ext.Msg.alert("提示信息", "eqim 网络不通!");
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.catalogingreportfail,
                    logcontent:"eqim 网络不通!"}],'duty/senddutylogs');
            }

        };
        var failFunc = function (form, action) {
            //Ext.Msg.alert("提示信息", "操作失败..!");
        };
        CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
    },
    catalogingclick:function(rec,store){
        var me=this;
        Ext.MessageBox.confirm('是否有编目', '有无编目?', function showResult(btn){
            if(btn==='yes'){
                me.completeduty(rec,store,'编目已发送');
            }else{
                me.completeduty(rec,store,'今日无编目');
            }
        });
    },
    savemissionconfig:function(btn){
        var url = 'duty/savemission';
        var me = this;
        var win = this.missionmanagerwin;
        var panel = win.down('panel');
        var sm = panel.getSelectionModel();
        var selectitem = sm.getSelection();
        var params = {
            id : selectitem[0].data.id
        };

        var successFunc = function (form, action) {
            panel.getStore().load();
            btn.up('window').hide();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "更新失败");
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form, params, url, successFunc, failFunc, "正在提交。。。")  ;
    },
    savedutyconfig:function(btn){
        var form=btn.up('form');
        localStorage.dutyalertinterval=form.getValues().dutyalertinterval;
        localStorage.eqimurl=form.getValues().eqimurl;
        localStorage.eqimusername=form.getValues().eqimusername;
        localStorage.eqimpassword=form.getValues().eqimpassword;
        localStorage.sourcedir=form.getValues().sourcedir;
        localStorage.targetdir=form.getValues().targetdir;
        localStorage.archiveminsize=form.getValues().archiveminsize;
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
                store.proxy.extraParams.day=Ext.util.Format.date(new Date(), "Y-m-d");
                me.anotherdayproc();
                me.dutyautocheck(store);
                //me.dutyshowalert(store);

            }
        });
        Ext.getStore('duty.DutyMissions').load();
    },

    anotherdayproc:function(){
       var now =new Date();

       if(Globle.logintime&&now.getDay()!=Globle.logintime.getDay()){
           var user_cl=this.application.getController("Users");
           //user_cl.maketodaymission();
           Globle.logintime=now;
           user_cl.getcurrentduty(function(){});
       }
    },
    getEventMap:function(){
      if(!this.eventMap){
          this.eventMap={};
          this.eventMap[missiontype.eqim]=Ext.bind(this.eqimclick,this);
          this.eventMap[missiontype.record]=Ext.bind(this.recordclick,this);
          this.eventMap[missiontype.waveform]=Ext.bind(this.waveformclick,this);
          this.eventMap[missiontype.archivefile]=Ext.bind(this.archivefileclick,this);
          this.eventMap[missiontype.earthquickfile]=Ext.bind(this.earthquickfileclick,this);
          this.eventMap[missiontype.catalogingreport]=Ext.bind(this.catalogingreportclick,this);
          this.eventMap[missiontype.cataloging]=Ext.bind(this.catalogingclick,this);
      }
        return this.eventMap;
    },
    dutyautocheck:function(store){
        var items=store.data.items;
        var me=this;
        Ext.each(items,function(item,index){
            var missionname=item.data.missionname;
            var missionstatus= item.data.missionstatus;
            var time=item.data.missiontime;
            var datetime=Ext.Date.parse(time, "H:i");
            var now=new Date();
            if(missionstatus==0&&time!=''&&datetime.getHours()<=now.getHours()){
                me.getEventMap()[missionname](item,store);
            }

        });

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
    logoutsystem:function(btn){
        window.location.reload();
    },
    openstationmanagerconfigwin:function(btn){
        if(!this.stationmanagerconfigwin)this.stationmanagerconfigwin= Ext.widget('stationmanagerconfigwin');
        this.stationmanagerconfigwin.show();
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
                eqimpassword:localStorage.eqimpassword,
                sourcedir:localStorage.sourcedir,
                targetdir:localStorage.targetdir,
                archiveminsize:localStorage.archiveminsize
            });

    },
    addnewstationwin:function(btn){
        if(!this.newstationwin)this.newstationwin= Ext.widget('addnewstationwin');
        this.newstationwin.show();
    },
    addnewmissionwin:function(btn){
        if(!this.newmissionwin)this.newmissionwin= Ext.widget('addnewmissionwin');
        this.newmissionwin.show();
    },
    checkarchive:function(btn){
        var me=this;
        var win=btn.up('window');
        var params={
            sourcedir:localStorage.sourcedir
        }
        var form = btn.up('form');
        localStorage.earthplatformlist=form.getValues()['earthplatformlist'];
        localStorage.archiveminsize=form.getValues()['archiveminsize'];
        var successFunc = function (forms, action) {

            me.completeduty(win.linkdata.rec,win.linkdata.grid);
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([{userid:Globle.userid,
                statustype:missiontype.archivefilesucc,
                logcontent:missiontype.archivefilesucc}],'duty/senddutylogs');
            win.close();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("文件异常", action.result.results);
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([
                {
                    userid:Globle.userid,
                    statustype:missiontype.archivefilefail,
                    logcontent:action.result.results.join(",")
                }
            ],'duty/senddutylogs');
        };
        CommonFunc.formSubmit(form, params, 'duty/checkarchive', successFunc, failFunc, "正在提交。。。");

    },
    copywaveform:function(btn){
        var me=this;
        var win=btn.up('window');
        var form = btn.up('form');
        var successFunc = function (forms, action) {
            localStorage.sourcedir=form.getValues()['sourcedir'];
            localStorage.targetdir=form.getValues()['targetdir'];
            me.completeduty(win.linkdata.rec,win.linkdata.grid);
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([{userid:Globle.userid,
                statustype:missiontype.waveformsucc,
                logcontent:missiontype.waveformsucc}],'duty/senddutylogs');
            win.hide();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "源目录不存在");
            win.hide();
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([{userid:Globle.userid,
                statustype:missiontype.waveformfail,
                logcontent:"源目录不存在"}],'duty/senddutylogs');
        };

        CommonFunc.formSubmit(form, {}, 'duty/copywavefile', successFunc, failFunc, "正在提交。。。");
    },

    editmissionwin:function(btn){
        if(!this.editmissionitemwin)this.editmissionitemwin= Ext.widget('editmissionitemwin');
        this.editmissionitemwin.show();
        var sm = btn.up('panel').getSelectionModel();
        var selectitem=sm.getSelection();
        var item=selectitem[0].data;
        var form=this.editmissionitemwin.down('form').getForm();
        form.setValues(item);

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
    addnewstation:function(btn){
        var url='duty/addnewstation';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.stationmanagerconfigwin.down('grid');
            btn.up('window').hide();
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
