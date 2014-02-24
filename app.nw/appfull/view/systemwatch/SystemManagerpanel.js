Ext.define('Webdesktop.view.systemwatch.SystemManagerpanel', {
    extend: 'Ext.tree.Panel',
    alias:'widget.systemmanagerpanel',
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
            xtype: 'tree-grid',
            forceFit: true,
            layout: 'fit',
            anchor: '100% 60%',
            useArrows: true,
            rootVisible: true,
            columns: [
                {header: '服务器名', dataIndex: 'servername',xtype: 'treecolumn'},
                {header: '服务器地址',dataIndex: 'servervalue'},
                {header: 'id',dataIndex: 'serverid',hidden:true}
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
            store: 'systemwatch.SystemManagers'
        });
        me.callParent(arguments);
    }
});