/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.user.UserManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.usermanagerwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '用户管理',
            height: 260,
            width: 520,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                xtype:'workmanagerpanel'
            }

        });
        this.callParent(arguments);
    }

});