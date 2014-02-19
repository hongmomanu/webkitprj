Ext.define('Webdesktop.view.duty.Dutypanel', {
    extend: 'Ext.grid.Panel',
    alias:'widget.dutypanel',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {

            border: false,
            hideHeaders:true,
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


                {header: '任务名', dataIndex: 'missionname',width: 150},
                {header: '任务状态', dataIndex: 'missionstatus',width: 250},
                {header: '任务完成时间', dataIndex: 'time',width: 150, renderer: function (val, obj, record) {
                    var time =Ext.Date.parse(val, "Y-m-d H:i:s");
                    val = Ext.util.Format.date(time, 'Y-m-d H:i');
                    return val;
                }}

            ],
            flex: 1,
            tbar:[
                {
                  xtype: 'label',
                  text:'今日值班人员:'+Globle.dutydisplayname+',当前登陆人员:'+Globle.displayname
                },
                {
                    text:'排班管理',
                    action:'workmanager',
                    hidden: !Globle.isadmin

                }
            ],

            store: 'duty.DutyMissions'


        });
        me.callParent(arguments);
    }
});