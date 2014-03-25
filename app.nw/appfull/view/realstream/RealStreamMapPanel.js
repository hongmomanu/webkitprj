Ext.define('Webdesktop.view.realstream.RealStreamMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.realstreammappanel',
    //layout: 'fit',

    requires: [
    ],

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            border: true,
            html:'<div id="realstreammap"  style="width: 100%;height: 100%;"><div id="popup"></div></div>'

        });


        me.callParent(arguments);

    }
});