Ext.define('Webdesktop.view.realstream.RealStreamGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.realstreamgrid',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        Ext.apply(me, {

            border: false,
            hideHeaders:false,
            multiSelect: true,
            viewConfig: {
                trackOver: true,
                loadMask: false,
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

                {header: '时间',dataIndex: 'time',width:40,renderer:function(val, obj, record){
                    return Ext.Date.format(new Date(val),'H:i');

                }},
                {header: '站台', dataIndex: 'stationcode',width:40},
                {header: '平均次数', dataIndex: 'crossavgbhz',width:40},
                {header: '当前次数', dataIndex: 'crossnowbhz',width:40},
                {header: '偏差百分比',width:60,renderer:function(val, obj, record){
                           return (((parseInt(record.get('crossnowbhz'))-parseInt(record.get('crossavgbhz')))
                               /parseInt(record.get('crossavgbhz')))*100).toFixed(1);
                        }
                }
            ],


            store: 'realstream.RealStreams'
        });
        me.callParent(arguments);
    }
});