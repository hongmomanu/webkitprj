Ext.define('Webdesktop.view.duty.StationManagerpanel', {
    extend: 'Ext.grid.Panel',
    alias:'widget.stationmanagerpanel',
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
                {header: '台网名称', dataIndex: 'networkname'},
                {header: '台站名称',dataIndex: 'stationname'},
                {header: '台站代码',dataIndex: 'stationcode'},
                {header: '数采地址',dataIndex: 'dataaddr'},
                {header: '网关地址',dataIndex: 'gatewayaddr'},
                {header: '通讯类型',dataIndex: 'connecttype'},
                {header: '联系人',dataIndex: 'contact'},
                {header: '联系人电话',dataIndex: 'phone'}
            ],
            flex: 1,
            tbar:[
                {
                    text:'新增',
                    action:'new',
                    hidden: !Globle.isadmin

                },
                {
                    text:'编辑',
                    action:'edit',
                    hidden: !Globle.isadmin

                }
                ,
                {
                    text:'删除',
                    itemId:'del',
                    disabled:true,
                    action:'del',
                    hidden: !Globle.isadmin

                }
            ],
            store: 'duty.StationManagers'
        });
        me.callParent(arguments);
    }
});