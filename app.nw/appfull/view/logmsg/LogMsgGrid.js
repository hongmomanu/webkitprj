Ext.define('Webdesktop.view.logmsg.LogMsgGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.logmsgrid',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {

            border: false,
            //hideHeaders:true,
            multiSelect: true,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                getRowClass: function (record, rowIndex, rowParams, store) {
                    var status=record.get('status');
                    if ( status== 'ping') {
                        return 'duty-gridrow-red';
                    } else if(status == 'app') {
                        return 'duty-gridrow-pink';
                    }else if(status == 'mem'){
                        return 'duty-gridrow-dark'
                    }
                    else{
                        return 'duty-gridrow-green';
                    }
                },
                stripeRows: true
            },

            forceFit: true,
            columns: [
                {header: '消息', dataIndex: 'msg',flex:1},
                {header: '目标机器', dataIndex: 'ip',flex:1},
                {header: '时间',dataIndex: 'msgtime',width:60}
            ],
            flex: 1,
            tbar:[

            ],
            store: Ext.create('Ext.data.Store', {
                storeId:'logmsgStore',
                fields:['msg', 'msgtime','status','ip'],
                data:{'items':[
                ]},
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        root: 'items'
                    }
                }
            })
        });
        me.callParent(arguments);
    }
});