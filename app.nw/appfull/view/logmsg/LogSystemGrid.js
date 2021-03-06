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
                trackOver: true,
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
                    }else if ( status== dutylogtype.logfail) {
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
                    }else if(status==missiontype.eqimsucc){
                        return 'duty-gridrow-disk';
                    }else if(status==missiontype.eqimfail){
                        return 'duty-gridrow-red';
                    }else if(status==missiontype.waveformsucc){
                        return 'duty-gridrow-disk';
                    }else if(status==missiontype.waveformfail){
                        return 'duty-gridrow-red';
                    }else if(status==missiontype.archivefilesucc){
                        return 'duty-gridrow-disk';
                    }else if(status==missiontype.archivefilefail){
                        return 'duty-gridrow-red';
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
                    itemId:'keyword',
                    width:100,
                    listeners: {
                        "specialkey": function (field, e) {
                            if (e.keyCode == 13) {
                                var keyword = field.getValue().replace(/\s+/g, "");
                                var panel=this.up('panel');
                                var store=panel.getStore();
                                var bgday=panel.down('#bgday').getValue();
                                var edday=panel.down('#edday').getValue();
                                var statustype=panel.down('#statustype').getValue();
                                store.proxy.extraParams.bgday = Ext.Date.format(new Date(bgday),'Y-m-d');
                                store.proxy.extraParams.edday = edday;
                                store.proxy.extraParams.keyword = keyword;
                                store.proxy.extraParams.statustype = statustype;
                                store.loadPage(1);
                            }
                        }
                    }
                },{
                    xtype:'datefield',
                    itemId:'bgday',
                    value: Ext.Date.add(new Date(), Ext.Date.DAY, -5),
                    width:110,
                    name: 'bgday'
                },{
                    xtype:'datefield',
                    itemId:'edday',
                    value:new Date(),
                    width:110,
                    name: 'edday'
                },
                {
                    xtype:'combobox',
                    width:110,
                    store:  Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data : searchlog_statue
                    }),
                    value:'',
                    itemId:'statustype',
                    name:'statustype',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value'
                },
                {
                    xtype:'button',
                    text:'搜索',
                    handler: function() {
                        var panel=this.up('panel');
                        var store=panel.getStore();
                        var bgday=panel.down('#bgday').getValue();
                        var edday=panel.down('#edday').getValue();
                        var keyword=panel.down('#keyword').getValue();
                        var statustype=panel.down('#statustype').getValue();
                        store.proxy.extraParams.keyword = keyword;
                        store.proxy.extraParams.bgday = Ext.Date.format(new Date(bgday),'Y-m-d');
                        store.proxy.extraParams.edday = edday;
                        store.proxy.extraParams.statustype = statustype;
                        store.loadPage(1);
                    }
                    //action:'search'
                },
                {
                    xtype:'button',
                    text:'统计',
                    searchtype:'system',
                    action:'static'
                },
                {
                    xtype:'button',
                    text:'删除',
                    hidden:!Globle.isadmin,
                    action:'del'
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