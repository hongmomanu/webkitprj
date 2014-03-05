Ext.define('Webdesktop.view.logmsg.LogSystemGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.logsystemgrid',
    layout: 'fit',
    requires: [
    ],

    initComponent: function() {
        var me = this;
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
                    var status=record.get('statustype');
                    if ( status== exceptiontype.ping) {
                        return 'duty-gridrow-red';
                    } else if(status == exceptiontype.app) {
                        return 'duty-gridrow-pink';
                    }else if(status == exceptiontype.mem){
                        return 'duty-gridrow-dark'
                    }else if(status == exceptiontype.disk){
                        return 'duty-gridrow-disk'
                    }
                    else if(status==exceptiontype.ok){
                        return 'duty-gridrow-green';
                    }
                },
                stripeRows: true
            },

            forceFit: true,
            columns: [
                {header: '事件内容', dataIndex: 'logcontent',flex:1},
                {header: '日志类型', dataIndex: 'statustype',flex:1},
                {header: '日志时间',dataIndex: 'time',width:120}
            ],
            flex: 1,
            tbar:[
                {
                    xtype:'textfield',
                    listeners: {
                        "specialkey": function (field, e) {
                            if (e.keyCode == 13) {
                                var keyword = field.getValue().replace(/\s+/g, "");
                                var panel=this.up('panel');
                                var store=panel.getStore();
                                store.proxy.extraParams.keyword = keyword;
                                store.loadPage(1);

                            }
                        }
                    }
                },{
                    xtype:'datefield',
                    name: 'bgday'
                },{
                    xtype:'datefield',
                    name: 'edday'
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'logmsg.LogSystems',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                emptyMsg: "无记录"
            }),
            store: 'logmsg.LogSystems'
        });
        me.callParent(arguments);
    }
});