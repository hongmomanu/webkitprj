/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.systemwatch.SystemManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.systemmanagerwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '系统服务配置管理',
            height: 360,
            width: 520,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: [{
                xtype:'systemmanagerpanel'
            }]

        });
        this.callParent(arguments);
    }

});