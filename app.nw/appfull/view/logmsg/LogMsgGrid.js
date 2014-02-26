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
                stripeRows: true
            },

            forceFit: true,
            columns: [
                {header: '消息', dataIndex: 'msg',flex:1},
                {header: '时间',dataIndex: 'msgtime'}
            ],
            flex: 1,
            tbar:[

            ],
            store: Ext.create('Ext.data.Store', {
                storeId:'logmsgStore',
                fields:['msg', 'msgtime'],
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