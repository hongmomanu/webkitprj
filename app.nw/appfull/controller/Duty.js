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
         'duty.WorkManagerpanel'
    ],
    models: [
        'duty.DutyMission',
        'duty.User',
        'duty.WorkManager'
    ],
    stores: [
        'duty.DutyMissions',
        'duty.Users',
        'duty.WorkManagers'

    ],

    init: function() {


        this.control({
            'dutypanel button[action=workmanager]':{
                click: this.openworkmanagerwin
            },
            'workmanagerpanel button[action=new]':{
                click: this.addnewworkwin
            },
            'addnewworkwin button[action=add]':{
                click: this.addnewduty
            }
        });
    },


    openworkmanagerwin:function(btn){
        if(!this.workmanagerwin)this.workmanagerwin= Ext.widget('dutymanagerwin');
        this.workmanagerwin.show();

    },
    addnewworkwin:function(btn){
        if(!this.newworkwin)this.newworkwin= Ext.widget('addnewworkwin');
        this.newworkwin.show();
    },
    addnewduty:function(btn){
        var url=Globle.iswebapp?"":localStorage.serverurl+'addnewduty';
        var successFunc = function (form, action) {
            //rolestore.load();
            //me.newRoleWin.hide();

        };
        var failFunc = function (form, action) {
            Ext.Msg.alert("提示信息", "新增失败，检查web服务或数据库服务");

        };
      this.formSubmit(btn,{},url,successFunc,failFunc,"正在提交。。。")
    },
    formSubmit: function (button, params, url, sucFunc, failFunc,waitmsg) {
        var form = button.up('form').getForm();
        if (form.isValid()) {
            //Ext.MessageBox.alert('Submitted Values', form.getValues(true));

            form.submit({
                waitTitle: '提示', //标题
                waitMsg: waitmsg, //提示信息
                url: url,

                method: "POST",
                params: params,
                success: sucFunc,
                failure: failFunc
            });

        }


    }


});
