Ext.define('Webdesktop.view.realstream.RealStreamGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.realstreamgrid',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {

            border: false,
            hideHeaders:false,
            multiSelect: true,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                getRowClass: function (record, rowIndex, rowParams, store) {
                   /* var status=record.get('status');
                    if ( status== 'ping') {
                        return 'duty-gridrow-red';
                    } else if(status == 'app') {
                        return 'duty-gridrow-pink';
                    }else if(status == 'mem'){
                        return 'duty-gridrow-dark'
                    }
                    else{
                        return 'duty-gridrow-green';
                    }*/
                },
                stripeRows: true
            },

            forceFit: true,
            columns: [

                {header: '时间',dataIndex: 'time',width:60},
                {header: '站台', dataIndex: 'stationname',flex:1},
                {header: '平均次数', dataIndex: 'times',flex:1}
            ],

            tbar:[

            ],
            store: 'realstream.RealStreams'
        });
        me.callParent(arguments);
    }
});