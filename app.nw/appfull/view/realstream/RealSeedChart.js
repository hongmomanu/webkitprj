Ext.define('Webdesktop.view.realstream.RealSeedChart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.realseedchart',
    //layout: 'fit',

    requires: [
    ],



    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            border: true,
            html:'<div id="realseedchart"  style="width: 100%;height: 33%;"></div>' +
                '<div id="realseedchartbhe" style="width: 100%;height: 33%;"></div>'+
                '<div id="realseedchartbhz" style="width: 100%;height: 33%;"></div>'
        });


        me.callParent(arguments);

    }
});