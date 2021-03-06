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

            border: true,



            //hideHeaders: true,
            viewConfig: {
                trackOver: true,
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
                stripeRows: true,
                frame: true
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
                        var content=record.get('dutylog');
                        var html=content.indexOf("异常")>0?('<a class="logdutyex" style="color:red;cursor: hand;">异常</a>'+
                            '<a style="display:none">'
                            +content+'</a>'): content;
                        return "已检查("+html+")";
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
                    html: '<a style="font-size: 12">今日值班人员:' +'<font color="red">' +Globle.dutydisplayname+'</font></a> ' //+',当前登陆人员:'+Globle.displayname
                },
                {
                    xtype: 'splitbutton',
                    text: '<font color="green" >值班管理</font>',
                    //hidden: !Globle.isadmin,
                    menu: [
                        {
                            text: '排班管理',
                            action: 'workmanager'/*,
                            hidden: !Globle.isadmin*/
                        },
                        {
                            text: '修改密码',
                            action: 'alteruser',
                            hidden: Globle.isadmin
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