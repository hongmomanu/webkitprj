Ext.define('Webdesktop.view.realstream.RealStreamRelationMapPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.realstreamrelationmappanel',

    requires: [
    ],

    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            border: true,
            html:'<div id="relationmap" style="width: 100%; height: 100%"></div>'

        });


        me.callParent(arguments);

    }
});