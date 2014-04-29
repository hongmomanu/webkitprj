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
            //hideHeaders: true,
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
                        return "未检查";
                    }
                    else {
                        return "已检查("+record.get('dutylog')+")";
                    }

                },width: 200},
                {
                    menuDisabled: true,
                    sortable: false,
                    header:'操作',
                    align:'center',
                    hidden:Globle.dutyuserid!=Globle.userid&&!Globle.isadmin,
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{

                        getClass: function(v, meta, rec) {
                            return 'duty-action-refresh';
                            //var time=rec.get('missiontime');
                            //var datetime=Ext.Date.parse(time, "H:i");
                            //var now=new Date();
                            /*if (rec.get('missionstatus') == 0) {
                                return 'duty-action-refresh';
                            } else {
                                return 'no';
                            }*/
                        },

                        tooltip: '刷新任务',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);

                            me.fireEvent('dutyclick',rec,grid.getStore());

                        }
                    }
                    ]
                },
                {header: '检查时间', dataIndex: 'time', align:'center',  renderer: function (val, obj, record) {
                    if(record.get('missionstatus')==0){
                         return ""
                    }else{
                        var time = Ext.Date.parse(val, "Y-m-d H:i:s");
                        val = Ext.util.Format.date(time, 'Y-m-d H:i');
                        return val +" 检查";
                    }

                }}


            ],
            tbar: [
                {
                    xtype: 'label',
                    text: '今日值班人员:' + Globle.dutydisplayname //+',当前登陆人员:'+Globle.displayname
                },
                {
                    xtype: 'splitbutton',
                    text: '值班管理',
                    //hidden: !Globle.isadmin,
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
                        },{
                            text: '台站管理',
                            action: 'stationmanager',
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