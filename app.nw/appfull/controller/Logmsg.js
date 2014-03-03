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
        'logmsg.LogDutyGrid'
    ],
    models: [
        'logmsg.LogSystem',
        'logmsg.LogDuty'
    ],
    stores: [
        'logmsg.LogSystems',
        'logmsg.LogDutys'
    ],

    init: function() {
        this.control({

            'logdutygrid,logsystemgrid':{

                gridshowfresh:function(grid){
                   var store=grid.getStore();
                    store.load();
                }
            }

        });
       /* Ext.widget('alertmsgwin',{title: '提示窗口',
            html: '测试信息',
            iconCls: 'error' });*/
        /*var msgwin=Ext.widget('alertmsgcornershowwin');
        msgwin.flyIn();*/
    }


});
