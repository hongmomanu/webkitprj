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
         'duty.EditStationWin',
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
         'duty.EarthListGrid',
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
                  var func=function(){
                      var task = new Ext.util.DelayedTask(function(){
                          var content=$('.logdutyex');
                          content.unbind( "click" );
                          //alert(1);
                          $('.logdutyex').click(function(){
                              if($(this).next().is(":visible"))$(this).next().hide();
                              else $(this).next().show();
                          });
                      });
                      task.delay(500);

                  };
                  store.on('load',func);
                  store.on('update',func);
                  store.load();
              },
              dutyclick:function(rec,store){
                  var missionname=rec.get('missionname');
                  var missionlabel=rec.get('missionlabel');
                  Ext.Msg.wait('处理中，请稍后...', '提示');
                  this.getEventMap()[missionlabel](rec,store);
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
            'stationmanagerpanel button[action=del]':{
                click: this.delstation
            },
            'stationmanagerpanel button[action=edit]':{
                click: this.editstationwin
            },
            'missionmanagerpanel button[action=new]':{
                click: this.addnewmissionwin
            },
            'missionmanagerpanel button[action=edit]':{
                click: this.editmissionwin
            },'missionmanagerpanel button[action=del]':{
                click: this.delmission
            },
            'addnewstationwin button[action=add]':{
                click: this.addnewstation
            },
            'editstationwin button[action=save]':{
                click: this.editstation
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
            url:localStorage.eqimurl
            //username:localStorage.eqimusername,
            //password:localStorage.eqimpassword,
            //url:localStorage.eqimurl,
            //securl:"http://192.168.2.141:8080/jz"
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                var html=res.msg;
                var td_arr=$(html).find("td[bgcolor$='white']");
                var time=new Date($(td_arr[2]).text());
                var now= new Date();
                var public_content='今日無公告信息';
                //console.log($(td_arr[1]).text());
                if(now.getFullYear()==time.getFullYear()&&now.getMonth()==time.getMonth()&&now.getDate()==time.getDate()){
                    public_content=$(td_arr[1]).text();
                }

                me.completeduty(item,store,public_content);//missiontype.eqimsucc+
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
        //CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
        CommonFunc.ajaxSend(params,'duty/eqimpublic',successFunc,failFunc,'POST');
    },
    getstationinfo:function(stationcode,callback){
      var params={
          stationcode:stationcode
      };
      var me=this;
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.length>0){
               var stationinfo=res[0];
               if(callback)callback(stationinfo)

            }else{
                Ext.Msg.alert("提示信息", "无测站"+stationcode+"信息..!");
            }
            //btn.up('panel').getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "操作失败..!");
        };
        //CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
        CommonFunc.ajaxSend(params,'duty/getstationinfo',successFunc,failFunc,'GET');
    },
    sendnewrecordyes:function(stationcode,begin_time,end_time){

        var me=this;
        //console.log(me);

        var callback=function (data){
            var params={};
            params["netStation.netCode"]=data.networkcode;
            params["netStation.staCode"]=data.stationcode;
            params.netCname=data.networkname;
            params.staCname=data.stationname;
            params.startTime=begin_time;
            params.endTime=end_time;
            params.url="http://10.33.5.103:8080/JOPENSWeb/mon/logStationFormController?key=3";
            params.id=0;
            params.operator=Globle.displayname;
            params.eventType=1301;
            params.treatType=2000;
            params.logContent="自行恢复";
            params.createTime=Ext.util.Format.date(new Date(), 'Y-m-d H:i:s');
            var successFunc = function (response, action) {
                var res = Ext.JSON.decode(response.responseText);
                //btn.up('panel').getStore().load();
            };
            var failFunc = function (form, action) {
                Ext.Msg.alert("提示信息", "操作失败..!");
            };
            //CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
            CommonFunc.ajaxSend(params,'duty/newrecord',successFunc,failFunc,'POST');


        };
        me.getstationinfo(stationcode,callback)

    },
    recordclick:function(rec,store){
      //alert(2);断记上传
        //Ext.Msg.hide();
      /*Ext.MessageBox.confirm('接口未实现', '', function showResult(btn){
          Ext.Msg.hide();
      });*/
        var today=Ext.util.Format.date(new Date(), "Y-m-d");
        var yestoday=Ext.util.Format.date(Ext.Date.add(new Date(),Ext.Date.DAY,-1),"Y-m-d");

        var me=this;
        var params={
            today:today,
            yestoday:yestoday
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);

            if(res.success){
                me.completeduty(rec,store,missiontype.recordyes);
                var system_cl=me.application.getController("Systemwatch");
                var logcontent="";
                for(var i=0;i<res.result.length;i++){
                    logcontent+=res.result[i].station+","+res.result[i].begin_time+"<br>";
                    me.sendnewrecordyes(res.result[i].station,res.result[i].begin_time,res.result[i].end_time)
                }
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.recordyes,
                    logcontent:logcontent}],'duty/senddutylogs');
            }else{
                me.completeduty(rec,store,missiontype.recordno);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([
                    {
                        userid:Globle.userid,
                        statustype:missiontype.recordno,
                        logcontent:missiontype.recordno
                    }
                ],'duty/senddutylogs');
            }


        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "服务失败");
            Ext.Msg.hide();
        };

        CommonFunc.ajaxSend(params,'duty/recordcheck',successFunc,failFunc,'POST');




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
            sourcedir:localStorage.eventdir,
            earthplatformlist:localStorage.earthplatformlist,
            archiveminsize:localStorage.archiveminsize,
            type:'event'
        };

        var successFunc = function (response, action) {

            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                me.completeduty(rec,store,missiontype.earthquicksucc);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.earthquicksucc,
                    logcontent:missiontype.earthquicksucc}],'duty/senddutylogs');
            }else{
                me.completeduty(rec,store,missiontype.earthquickfail+'('+res.results+")");
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([
                    {
                        userid:Globle.userid,
                        statustype:missiontype.earthquickfail,
                        logcontent:'('+res.results+")个地震事件"
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
            sourcedir:localStorage.wavedir,
            earthplatformlist:localStorage.earthplatformlist,
            archiveminsize:localStorage.archiveminsize,
            type:'wave'
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
            Ext.Msg.hide();
            Ext.Msg.alert("提示信息", "操作失败..!");


        };
        CommonFunc.ajaxSend(params,'duty/checkarchive',successFunc,failFunc,'POST');

    },
    catalogingreportclick:function(item,store){
        var me=this;
        //console.log(me);
        var params={
            id:item.raw.id,
            url:localStorage.reportloginurl,
            username:localStorage.reportusername,
            password:localStorage.reportpassword,
            securl:localStorage.reporturl
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                var html=res.msg;
                var td_arr=$(html).find("td");
                var time=new Date($(td_arr[7]).text());
                var now= new Date();
                var public_content='今日无登记';
                //console.log($(td_arr[1]).text());
                if(now.getFullYear()==time.getFullYear()&&now.getMonth()==time.getMonth()&&now.getDate()==time.getDate()){
                    public_content='今日有登记<br>'+$(td_arr[7]).text();
                }

                //testobj=html;
                me.completeduty(item,store,public_content);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.catalogingreportsucc,
                    logcontent:public_content}],'duty/senddutylogs');
            }else{
                //Ext.Msg.alert("提示信息", "eqim 网络不通!");
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{userid:Globle.userid,
                    statustype:missiontype.catalogingreportfail,
                    logcontent:"网络不通!"}],'duty/senddutylogs');
            }

        };
        var failFunc = function (form, action) {

            Ext.Msg.alert("提示信息", "操作失败..!");
            Ext.Msg.hide();
        };
        //CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
        CommonFunc.ajaxSend(params,'duty/eqimpubliclogin',successFunc,failFunc,'POST');
    },
    catalogingclick:function(rec,store){
        var me=this;
        if(!localStorage.catalogtel||localStorage.catalogtel==""){
            Ext.Msg.alert("提示信息", "编目人员号码未确定!");
            Ext.Msg.hide();
            return;
        }
        Ext.MessageBox.confirm('是否有编目', '有无编目?', function showResult(btn){
            if(btn==='yes'){

                //console.log(me);
                var mapkey={"134": 1,"135": 1,"136": 1 ,"137": 1 ,"138": 1 ,"139": 1 ,"150": 1 ,"151": 1,
                    "152": 1,"157": 1,"158": 1 ,"159": 1 ,"182": 1 ,"183": 1 ,
                    "187": 1,"188": 1 ,"130": 2 ,"131":2 ,"132": 2 ,"155": 2 ,"156": 2 ,"185": 2 ,
                    "186": 2 ,"133": 3 ,"153": 3 ,"180": 3 ,"189": 3};
                var telpart=mapkey[(Globle.tel+"").substring(0,3)];
                var params={
                    tel:localStorage.catalogtel,
                    msg:"[EqAIR]提醒：今日有编目，请及时处理！" ,
                    telpart:telpart
                };
                var successFunc = function (response, action) {
                    var res = Ext.JSON.decode(response.responseText);
                    if(res.success){
                        me.completeduty(rec,store,'编目已发送');
                        var system_cl=me.application.getController("Systemwatch");
                        system_cl.sendsystemlogs([{userid:Globle.userid,
                            statustype:missiontype.cataloging,
                            logcontent:'编目已发送'}],'duty/senddutylogs');
                    }else{
                        //Ext.Msg.alert("提示信息", "eqim 网络不通!");
                        var system_cl=me.application.getController("Systemwatch");
                        system_cl.sendsystemlogs([{userid:Globle.userid,
                            statustype:missiontype.catalogingfail,
                            logcontent:"发送失败!"}],'duty/senddutylogs');
                    }

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息", "操作失败..!");
                    Ext.Msg.hide();
                };
                //CommonFunc.ajaxSend(params,'duty/eqimcheck',successFunc,failFunc,'POST');
                CommonFunc.ajaxSend(params,'duty/sendsms',successFunc,failFunc,'POST');



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
            Ext.Msg.hide();
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form, params, url, successFunc, failFunc, "正在提交。。。")  ;
    },
    savedutyconfig:function(btn){
        var form=btn.up('form');
        localStorage.dutyalertinterval=form.getValues().dutyalertinterval;
        localStorage.eqimurl=form.getValues().eqimurl;
        localStorage.reporturl=form.getValues().reporturl;
        localStorage.recordurl=form.getValues().recordurl;
        localStorage.reportloginurl=form.getValues().reportloginurl;
        localStorage.reportusername=form.getValues().reportusername;
        localStorage.reportpassword=form.getValues().reportpassword;
        localStorage.catalogtel=form.getValues().catalogtel;
        //localStorage.sourcedir=form.getValues().sourcedir;
        //localStorage.targetdir=form.getValues().targetdir;
        localStorage.wavedir=form.getValues().wavedir;
        localStorage.eventdir=form.getValues().eventdir;
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
           AlertContent={};
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
            var missionlabel=item.data.missionlabel;
            var missionstatus= item.data.missionstatus;
            var time=item.data.missiontime;
            var datetime=Ext.Date.parse(time, "H:i");
            var now=new Date();
            if(missionstatus==0&&time!=''&&datetime.getTime()<=now.getTime()){
                var maps= me.getEventMap();
                maps[missionlabel](item,store);
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
        if(localStorage.eqimurl){
            form.setValues(
                {
                    dutyalertinterval:parseInt(localStorage.dutyalertinterval),
                    eqimurl:localStorage.eqimurl,
                    recordurl:localStorage.recordurl,
                    reporturl:localStorage.reporturl,
                    reportloginurl:localStorage.reportloginurl,
                    reportusername:localStorage.reportusername,
                    catalogtel:localStorage.catalogtel,
                    reportpassword:localStorage.reportpassword,
                    wavedir:localStorage.wavedir,
                    eventdir:localStorage.eventdir,
                    archiveminsize:localStorage.archiveminsize
                });
        }


    },
    delstation:function(btn){
        var panel=btn.up('panel');
        var sm = panel.getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        Ext.MessageBox.confirm('提示', '确定删除选中站台?', function showResult(btn){
            if(btn=='yes'){
                var params = {
                    sid:selectitem[0].data.id
                };
                var successFunc = function (response, action) {
                    var res = Ext.JSON.decode(response.responseText);
                    if(res.success){
                        panel.getStore().load();
                    }

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息", "删除站台失败!");
                    Ext.Msg.hide();
                };
                CommonFunc.ajaxSend(params, 'duty/delstation', successFunc, failFunc,'POST');
            }
        });

    },
    addnewstationwin:function(btn){
        if(!this.newstationwin)this.newstationwin= Ext.widget('addnewstationwin');
        this.newstationwin.show();
    },
    editstationwin:function(btn){

        var sm = btn.up('panel').getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        if(!this.myeditstationwin)this.myeditstationwin= Ext.widget('editstationwin');
        this.myeditstationwin.show();
        var item=selectitem[0].data;
        var form=this.myeditstationwin.down('form').getForm();
        form.setValues(item);


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
    delmission:function(btn){
        var panel=btn.up('panel');
        var sm = panel.getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        Ext.MessageBox.confirm('提示', '确定删除选中任务?', function showResult(btn){
            if(btn=='yes'){
                var params = {
                    missionid:selectitem[0].data.id
                };
                var successFunc = function (response, action) {
                    var res = Ext.JSON.decode(response.responseText);
                    if(res.success){
                        panel.getStore().load();
                    }

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息", "删除任务失败!");
                    Ext.Msg.hide();
                };
                CommonFunc.ajaxSend(params, 'duty/delmission', successFunc, failFunc,'POST');
            }
        });
    },
    editmissionwin:function(btn){
        var sm = btn.up('panel').getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选择要编辑的内容");
            return;
        }

        if(!this.editmissionitemwin)this.editmissionitemwin= Ext.widget('editmissionitemwin');
        this.editmissionitemwin.show();

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
            Ext.Msg.hide();
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
    editstation:function(btn){
        var url='duty/savestation';
        var me=this;
        var successFunc = function (form, action) {
            var grid=me.stationmanagerconfigwin.down('grid');
            btn.up('window').hide();
            grid.getStore().load();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息","保存失败!");
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
