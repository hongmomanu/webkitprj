Ext.define('Webdesktop.view.logmsg.LogGridChart', {
    extend: 'Ext.grid.Panel',
    alias:'widget.loggridchart',
    layout: 'fit',
    requires: [
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            columns: [
                {
                    text   : '日志类型',
                    dataIndex: 'statustype'
                },
                {
                    text   : '统计数',
                    dataIndex: 'counts'
                }
            ],
            height: 150,
            width: 280,
            store: 'logmsg.LoggridpieCharts'
        });
        me.callParent(arguments);
    }
});