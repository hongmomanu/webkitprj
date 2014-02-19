Ext.define('Webdesktop.view.duty.MissionManagerpanel', {
    extend: 'Ext.grid.Panel',
    alias:'widget.missionmanagerpanel',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {

            border: false,
            hideHeaders:true,
            multiSelect: true,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true,
                stripeRows: true
            },

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
            columns: [
                {header: '值班任务', dataIndex: 'missionname',width: 150},
                {header: '任务提醒时间',dataIndex: 'missiontime',width: 250}
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