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
        'logmsg.AlertMsgCornerShowWin'
    ],
    models: [

    ],
    stores: [

    ],

    init: function() {
        /*this.control({

        });*/
       /* Ext.widget('alertmsgwin',{title: '提示窗口',
            html: '测试信息',
            iconCls: 'error' });*/
        /*var msgwin=Ext.widget('alertmsgcornershowwin');
        msgwin.flyIn();*/
    }


});
