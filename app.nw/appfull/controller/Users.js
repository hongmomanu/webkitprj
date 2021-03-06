/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Users', {
    extend: 'Ext.app.Controller',
    views: [
        'user.Login',
        'user.Lockwin',
        'user.Config',
        'user.UserManagerWin',
        'user.UserManagerpanel',
        'user.AddnewUserWin',
        'user.EditUserWin',
        'Viewport'
    ],

    models: [
        'user.User'
    ],
    stores: [
        'user.Users'
    ],

    init: function() {


        this.control({
            'webdesktop_login button[action=openconfigwin]':{
                click: this.openconfigwin

            },'webdesktop_login button[action=login]':{
                click: this.user_login

            },'webdesktop_config button[action=saveconfig]':{
                click: this.saveconfig

            },'webdesktop_lockwin button[action=unlockwin]':{
                click: this.unlockwin

            },'usermanagerpanel button[action=new]':{
                click: this.openaddnewuserwin

            },'usermanagerpanel button[action=edit]':{
                click: this.openedituserwin

            },'usermanagerpanel button[action=del]':{
                click: this.deluser

            },'addnewuserwin button[action=add]':{
                click: this.addnewuser

            },'edituserwin button[action=save]':{
                click: this.saveuser

            },
            'dutypanel menuitem[action=usermanager]':{
                click: this.openusermanagerwin
            }

        });


    },
    addnewuser:function(btn){
        var url = 'user/adduser';
        var win = this.usermanagerwin;
        var panel = win.down('panel');

        var params = {

        };
        var successFunc = function (form, action) {
            panel.getStore().load();
            btn.up('window').hide();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增用户失败");
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form, params, url, successFunc, failFunc, "正在提交。。。")  ;
    },
    saveuser:function(btn){
        var url = 'user/saveuser';
        var win = this.usermanagerwin;
        var panel = win.down('panel');

        var params = {

        };
        var successFunc = function (form, action) {
            panel.getStore().load();
            btn.up('window').hide();
        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "编辑用户失败");
        };

        var form = btn.up('form');
        CommonFunc.formSubmit(form, params, url, successFunc, failFunc, "正在提交。。。")  ;
    },
    openaddnewuserwin:function(btn){
        if(!this.addnewuserwin)this.addnewuserwin= Ext.widget('addnewuserwin');
        this.addnewuserwin.show();

    },
    deluser:function(btn){
        var panel=btn.up('panel');
        var sm = panel.getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        Ext.MessageBox.confirm('提示', '确定删除选中用户', function showResult(btn){
            if(btn=='yes'){
                var params = {
                    userid:selectitem[0].data.userid
                };
                var successFunc = function (response, action) {
                    var res = Ext.JSON.decode(response.responseText);
                    if(res.success){
                        panel.getStore().load();
                    }

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息", "删除用户失败!");
                };
                CommonFunc.ajaxSend(params, 'user/deluser', successFunc, failFunc,'POST');
            }
        });
    },
    openedituserwin:function(btn){
        var sm = btn.up('panel').getSelectionModel();
        var selectitem=sm.getSelection();
        if(selectitem.length==0){
            Ext.Msg.alert("提示信息", "请选中编辑项");
            return;
        }
        if(!this.edituserwin)this.edituserwin= Ext.widget('edituserwin');
        this.edituserwin.show();

        var item=selectitem[0].data;
        var form=this.edituserwin.down('form').getForm();
        form.setValues(item);



    },
    openusermanagerwin:function(btn){
        if(!this.usermanagerwin)this.usermanagerwin= Ext.widget('usermanagerwin');
        this.usermanagerwin.show();
    },
    desktop_widget:null,
    user_login:function(btn){
        var me=this;
        var loginform =btn.up('form');
        var win=loginform.up('window');
        var params={};
        var url="login";
        var me=this;
        var successFunc = function (form, action) {
             Ext.getStore('duty.MissionManagers').load();
             Ext.getStore('duty.StationManagers').load();
             Ext.getStore('duty.WorkManagers').load();
             Ext.getStore('duty.DutyMissions').load();
             //Ext.getStore('duty.WorkManagerEvents').load();
             //Ext.getStore('duty.WorkManagerEvents').load();
             //Ext.getStore('duty.WorkManagerCalendars').load();
             win.close();
             Globle.password=action.result.result.password;
             Globle.username=action.result.result.username;
             Globle.userid=action.result.result.id;
             Globle.tel=action.result.result.telnum;
             Globle.displayname=action.result.result.displayname;
             Globle.isadmin=(action.result.result.admin==1);
             Globle.logintime=new Date();
             var callback=function(){
                 Ext.widget('viewport');
             };
             me.getcurrentduty(callback);
            var system_cl=me.application.getController("Systemwatch");
            system_cl.sendsystemlogs([{userid:action.result.result.id,
                statustype:dutylogtype.logsucc,
                logcontent:action.result.result.username}],'duty/senddutylogs');
             //me.desktop_widget=Ext.widget('maindesktopview');

        };

        var failFunc = function (form, action) {
            //console.log(action);
            if(action.response.status==200){
                Ext.Msg.alert("登陆失败", action.result.msg);
                var system_cl=me.application.getController("Systemwatch");
                system_cl.sendsystemlogs([{
                    statustype:dutylogtype.logfail,
                    logcontent:action.result.username}],'duty/senddutylogs');
            }else{
                Ext.Msg.alert("登陆失败", "找不到服务");
            }



        };

        CommonFunc.formSubmit(loginform, params, url, successFunc, failFunc,"正在验证登陆");


    },

    getcurrentduty:function(callback){
        var me=this;
        var params = {
            day:(new Date()).getDay(),
            date:Ext.Date.format(new Date(),'Y-m-d')
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);

            if(res.length>0){
                console.log(res);
                Globle.dutydisplayname=res[0].displayname;
                Globle.dutyusername=res[0].username;
                Globle.dutyuserid=res[0].userid;
                Globle.dutyenumid=res[0].enumid;
                Globle.dutytel=res[0].telnum;
            }else{
                Globle.dutydisplayname=Globle.displayname;
                Globle.dutyusername=Globle.username;
                Globle.dutyuserid=Globle.userid;
                Globle.dutytel=Globle.tel;


                //Globle.dutyenumid=res[0].enumid;

            }


            callback();
            me.maketodaymission();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "获取今日值班人员失败!");
            callback();
        };
        CommonFunc.ajaxSend(params, 'getcurrentduty', successFunc, failFunc,'GET');

    },
    maketodaymission:function(){
       var params = {
           day:Ext.util.Format.date(new Date(), "Y-m-d"),
           userid:Globle.dutyuserid
       };
       var successFunc = function (response, action) {
           var res = Ext.JSON.decode(response.responseText);
           if(res.success){
               Ext.getStore('duty.DutyMissions').load();
           }

       };
       var failFunc = function (form, action) {
           Ext.Msg.alert("提示信息", "生成值日任务失败!");
       };
       CommonFunc.ajaxSend(params, 'maketodaymission', successFunc, failFunc,'GET');

    },
    openconfigwin:function(btn){

        if(!this.openconfig_win)this.openconfig_win=Ext.widget('webdesktop_config');
        this.openconfig_win.show();

        var form=this.openconfig_win.down('form').getForm();
        form.setValues({serverurl: localStorage.serverurl});

    },
    saveconfig:function(btn){

       var win=btn.up('window');
       var form=win.down('form').getForm();
       localStorage.serverurl=form.getValues().serverurl;
       window.location.reload();
       win.hide();

    },
    unlockwin:function(btn){
        var win=btn.up('window');
        var form=win.down('form').getForm();
        var password=form.getValues().password;
        if(password==Globle.password){
            win.close();
        }else{
            Ext.Msg.alert("解锁失败", "密码错误");
        }

    }

});
