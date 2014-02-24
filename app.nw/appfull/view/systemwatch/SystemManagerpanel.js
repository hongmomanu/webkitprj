Ext.define('Webdesktop.view.duty.SystemManagerpanel', {
    extend: 'Ext.grid.Panel',
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

            forceFit: true,
            columns: [
                {header: '值班任务', dataIndex: 'missionname'},
                {header: '任务提醒时间',dataIndex: 'missiontime'},
                {header: '提醒时间间隔',dataIndex: 'missioninterval'}
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
            store: 'duty.MissionManagers'
        });
        me.callParent(arguments);
    }
});