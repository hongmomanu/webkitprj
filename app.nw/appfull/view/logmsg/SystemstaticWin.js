/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.logmsg.SystemstaticWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.systemstaticwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '统计',
            height: 260,
            width: 520,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                searchtype:this.searchtype,
                bgday:this.bgday,
                edday:this.edday,
                xtype:'logsystemstaticschart'
            }

        });
        this.callParent(arguments);
    }

});