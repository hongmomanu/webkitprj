/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.logmsg.AlertMsgCornerWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.alertmsgcornerwin',
    requires: [
    ],
    openMsgWinConfig: { width: 53, height: 40 },
    eBody:Ext.getBody(),
    initComponent: function () {
        var me=this;
        Ext.apply(this, {
            closable: false,
            shadow: false,
            resizable: false,
            draggable:false,
            x: me.eBody.getWidth() - this.openMsgWinConfig.width, y: me.eBody.getHeight() - this.openMsgWinConfig.height,
            width: this.openMsgWinConfig.width,
            height: this.openMsgWinConfig.height,
            items: [
                {
                    xtype: 'button',
                    text: '打开',
                    layout: 'fit',
                    handler: function () {
                     me.msgWin.flyIn();
                } }
            ], flyIn: function () {
                me.show();
                me.getEl().shift(
                    {
                        x: me.eBody.getWidth() - me.getWidth(),
                        y: me.eBody.getHeight() - me.getHeight() });
            },
            flyOut: function () {
                if (!this.isVisible()) {
                    return;
                }
                //var myWin = openMsgWin;
                me.getEl().shift({ x: me.eBody.getWidth() - me.getWidth(), y: me.eBody.getHeight() });
            }
        });
        this.callParent(arguments);
    }


});