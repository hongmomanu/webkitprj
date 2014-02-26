/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.logmsg.AlertMsgCornerShowWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.alertmsgcornershowwin',
    requires: [
    ],
    msgWinConfig: { width: 300, height: 200 },
    eBody: Ext.getBody(),
    initComponent: function () {
        var me = this;
        Ext.apply(this, {
            resizable: false,
            id:'logtmsgwin',
            x: me.eBody.getWidth() - me.msgWinConfig.width,
            y: me.eBody.getHeight(),
            width: me.msgWinConfig.width,
            height: me.msgWinConfig.height,
            shadow: false,
            layout:'fit',
            items: [
                {xtype:'logmsgrid'}
            ],
            listeners: {
                beforeclose: function () {
                    var win = this;
                    win.flyOut();
                    return false;
                }
            },
            flyIn: function () {
                var myWin = this;
                myWin.show();
                myWin.getEl().shift({
                    x: me.eBody.getWidth() - myWin.getWidth(),
                    y: me.eBody.getHeight() - myWin.getHeight(),
                    opacity: 80,
                    easing: 'easeOut',
                    duration: .35
                });
                if(!me.openMsgWin)me.openMsgWin=Ext.widget('alertmsgcornerwin');
                me.openMsgWin.flyOut();
                me.openMsgWin.msgWin=me;
                myWin.isFlyIn = true;
            }, flyOut: function () {
                var myWin = this;
                myWin.getEl().shift({
                    y: me.eBody.getHeight()
                });
                me.openMsgWin.flyIn();
                myWin.isFlyIn = false;
            }
            //自动设置位置
            , autoPosition: function () {
                if (this.isFlyIn) {
                    this.flyIn();
                } else {
                    this.flyOut();
                }
            }
        });
        this.callParent(arguments);
    }


});