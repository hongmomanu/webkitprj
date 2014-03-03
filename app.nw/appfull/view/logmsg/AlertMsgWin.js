/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.logmsg.AlertMsgWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.alertmsgwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            width: 250,
            height: 150,
            autoScroll: true,
            autoDestroy: true,
            plain: false,
            closeAction:'hide',
            shadow:false
        });

        this.callParent(arguments);
    }


});