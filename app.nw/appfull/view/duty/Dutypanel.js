Ext.define('Webdesktop.view.duty.Dutypanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dutypanel',
    layout: 'fit',

    requires: [
    ],

    initComponent: function () {
        var me = this;
        //alert(1);
        Ext.apply(me, {

            border: false,
            hideHeaders: true,
            flex:1,
            viewConfig: {
                trackOver: false,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection: true,
                getRowClass: function (record, rowIndex, rowParams, store) {
                    if (record.get('missionstatus') == 0) {
                        return 'duty-gridrow-red';
                    } else {
                        return 'duty-gridrow-green';
                    }
                },
                stripeRows: true
            },

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            forceFit: true,
            columns: [


                {header: '任务名', align:'center',dataIndex: 'missionname'},
                {header: '任务状态',align:'center', dataIndex: 'missionstatus', renderer: function (val, obj, record) {
                    if (val == 0) {
                        return "未完成";
                    }
                    else {
                        return "已完成";
                    }

                }},
                {
                    menuDisabled: true,
                    sortable: false,
                    align:'center',
                    hidden:Globle.dutyuserid!=Globle.userid&&!Globle.isadmin,
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{

                        getClass: function(v, meta, rec) {
                            if (rec.get('missionstatus') == 0) {
                                return 'duty-action-col';
                            } else {
                                return 'no';
                            }
                        },

                        tooltip: '点击完成值班任务',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);

                            me.fireEvent('dutyclick',rec,grid);

                        }
                    }
                    ]
                },
                {header: '任务完成时间', dataIndex: 'time', align:'center',  renderer: function (val, obj, record) {
                    if(record.get('missionstatus')==0){
                         return ""
                    }else{
                        var time = Ext.Date.parse(val, "Y-m-d H:i:s");
                        val = Ext.util.Format.date(time, 'Y-m-d H:i');
                        return val +" 完成";
                    }

                }}


            ],
            flex: 1,
            tbar: [
                {
                    xtype: 'label',
                    text: '今日值班人员:' + Globle.dutydisplayname //+',当前登陆人员:'+Globle.displayname
                },
                {
                    xtype: 'splitbutton',
                    text: '值班管理',
                    hidden: !Globle.isadmin,
                    menu: [
                        {
                            text: '排班管理',
                            action: 'workmanager',
                            hidden: !Globle.isadmin
                        },
                        {
                            text: '工作任务管理',
                            action: 'missionmanager',
                            hidden: !Globle.isadmin

                        },
                        {
                            text: '用户管理',
                            action: 'usermanager',
                            hidden: !Globle.isadmin
                        },
                        {
                            text: '值班配置',
                            action: 'dutymanager',
                            hidden: !Globle.isadmin
                        },
                        {
                            text: '注销',
                            action: 'logout'
                        }
                    ]

                }


            ],

            store: 'duty.DutyMissions'


        });
        me.callParent(arguments);
    }
});