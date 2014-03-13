/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.StationManagerConfigwin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.stationmanagerconfigwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '工作任务管理',
            height: 260,
            width: 620,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                xtype:'stationmanagerpanel'
            }

        });
        this.callParent(arguments);
    }

});