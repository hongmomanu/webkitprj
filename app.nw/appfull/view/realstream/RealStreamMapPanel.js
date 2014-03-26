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
            html:'<div id="realstreammap"  style="width: 100%;height: 100%;"><div id="popup">' +
                /*'<a href="#" id="popup-closer" class="ol-popup-closer"></a>'+
                '<div id="popup-content"></div>' +*/
                '</div></div>'

        });


        me.callParent(arguments);

    }
});