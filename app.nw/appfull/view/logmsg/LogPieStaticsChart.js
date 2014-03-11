Ext.define('Webdesktop.view.logmsg.LogPieStaticsChart', {
    extend: 'Ext.chart.Chart',
    alias:'widget.logpiestaticschart',
    requires: [
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            width: 300,
            height: 280,
            animate: false,
            store: 'logmsg.LoggridpieCharts',
            shadow: false,
            insetPadding: 0,
            //theme: 'Base:gradients',
            series: [{
                type: 'pie',
                field: 'counts',
                showInLegend: false,
                label: {
                    field: 'statustype',
                    display: 'rotate',
                    contrast: true,
                    font: '9px Arial'
                }
            }]


        });
        me.callParent(arguments);
    }
});