/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.MissionManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.missionmanagerwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '工作任务管理',
            height: 260,
            width: 520,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                xtype:'missionmanagerpanel'
            }

        });
        this.callParent(arguments);
    }

});