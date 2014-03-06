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
           }

        });

    },

    showsystemstaticWin:function(btn){
        this.systemstaticwin= Ext.widget('systemstaticwin',{
            searchtype:btn.searchtype
        });
        this.systemstaticwin.show();
    }


});
