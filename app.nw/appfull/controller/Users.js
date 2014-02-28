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
        'Viewport'
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

            }

        });


    },
    desktop_widget:null,
    user_login:function(btn){
        var me=this;
        var form =btn.up('form');
        var win=form.up('window');
        var params={};
        var url="login";
        var me=this;
        var successFunc = function (form, action) {
             win.close();
             Globle.password=action.result.result.password;
             Globle.username=action.result.result.username;
             Globle.userid=action.result.result.id;
             Globle.displayname=action.result.result.displayname;
             Globle.isadmin=action.result.result.admin==1;
             var callback=function(){
                 Ext.widget('viewport');
             }
             me.getcurrentduty(callback);
             //me.desktop_widget=Ext.widget('maindesktopview');




        };

        var failFunc = function (form, action) {
            if(action.response.status==200){
                Ext.Msg.alert("登陆失败", action.result.msg);
            }else{
                Ext.Msg.alert("登陆失败", "找不到服务");
            }


        };

        CommonFunc.formSubmit(form, params, url, successFunc, failFunc,"正在验证登陆");


    },
    getcurrentduty:function(callback){
        var me=this;
        var params = {
            day:(new Date()).getDay()
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            Globle.dutydisplayname=res[0].displayname;
            Globle.dutyusername=res[0].username;
            Globle.dutyuserid=res[0].userid;
            Globle.dutyenumid=res[0].enumid;
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
