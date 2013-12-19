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
        'user.Config'
    ],

    init: function() {

        console.log('Initialized Users! This happens before the Application launch function is called');

        this.control({
            'webdesktop_login button[action=openconfigwin]':{
                click: this.openconfigwin

            },'webdesktop_login button[action=login]':{
                click: this.user_login

            },'webdesktop_config button[action=saveconfig]':{
                click: this.saveconfig

            }

        });


    },
    user_login:function(btn){

        var form =btn.up('form');
        var win=form.up('window');
        var params={};
        var url=Globle.iswebapp?"":localStorage.serverurl;

        url=url+"login";

        var successFunc = function (form, action) {
             win.close();
             console.log(action);
             Ext.widget('maindesktopview');


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

    }

});
