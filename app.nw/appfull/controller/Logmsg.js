/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Logmsg', {
    extend: 'Ext.app.Controller',
    views: [
         'logmsg.AlertMsgWin',
        'logmsg.AlertMsgCornerWin',
        'logmsg.LogMsgGrid',
        'logmsg.AlertMsgCornerShowWin',
        'logmsg.LogSystemGrid',
        'logmsg.LogSystemStaticsChart',
        'logmsg.LogPieStaticsChart',
        'logmsg.LogGridChart',
        'logmsg.SystemstaticWin',
        'logmsg.LogDutyGrid'
    ],
    models: [
        'logmsg.LogSystem',
        'logmsg.LogSystemStatic',
        'logmsg.LogDuty'
    ],
    stores: [
        'logmsg.LogSystems',
        'logmsg.LogSystemStatics',
        'logmsg.LoggridpieCharts',
        'logmsg.LogDutys'
    ],

    init: function() {
        this.control({
           'logdutygrid button[action=static],logsystemgrid button[action=static]':{
               click: this.showsystemstaticWin
           },
            'logsystemgrid button[action=del]':{
                click: this.dellog
            }

        });

    },
    dellog:function(btn){

        Ext.MessageBox.confirm('删除确认', '您确认要删除查找出的日志内容么?', function(msg){
            if(msg==='yes'){
                var url='log/deletelogs';
                var panel=btn.up('panel');
                var store=panel.getStore();
                var bgday=panel.down('#bgday').getValue();
                var edday=panel.down('#edday').getValue();
                var keyword=panel.down('#keyword').getValue();
                var statustype=panel.down('#statustype').getValue();

                var params={
                    bgday:bgday,
                    edday:edday,
                    keyword:keyword,
                    statustype:statustype
                };
                var successFunc = function (response, action) {
                    Ext.Msg.alert("提示信息", "删除日志成功!");
                    store.load();

                };
                var failFunc = function (form, action) {
                    Ext.Msg.alert("提示信息", "失败!");
                };
                CommonFunc.ajaxSend(params,url,successFunc,failFunc,'POST');

            }

        });
    },
    showsystemstaticWin:function(btn){
        var panel=btn.up('panel');
        var edday=panel.down('#edday').getValue();
        var bgday=Ext.Date.format(new Date(panel.down('#bgday').getValue()),'Y-m-d');
        this.systemstaticwin= Ext.widget('systemstaticwin',{
            searchtype:btn.searchtype,
            edday:edday,
            bgday:bgday
        });
        this.systemstaticwin.show();
    }


});
