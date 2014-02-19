/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.DutyManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.dutymanagerwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '值班排班',
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