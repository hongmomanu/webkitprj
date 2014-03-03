Ext.define('Webdesktop.view.logmsg.LogDutyGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.logdutygrid',
    layout: 'fit',
    requires: [
    ],
    /*listeners: {
        show: function(panel) {
            this.fireEvent('gridshowfresh',this);
        }
    },*/
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
                    if ( status== dutylogtype.logfail) {
                        return 'duty-gridrow-red';
                    } else if(status == dutylogtype.logoutfail) {
                        return 'duty-gridrow-pink';
                    }else if(status == dutylogtype.logsucc){
                        return 'duty-gridrow-green'
                    }else if(status == exceptiontype.logoutsucc){
                        return 'duty-gridrow-green'
                    }
                    else if(status==exceptiontype.ok){
                        return 'duty-gridrow-dark';
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
                }
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: 'logmsg.LogDutys',
                displayInfo: true,
                displayMsg: '显示 {0} - {1}条记录,共 {2}条记录',
                emptyMsg: "无记录"
            }),
            store: 'logmsg.LogDutys'
        });
        me.callParent(arguments);
    }
});