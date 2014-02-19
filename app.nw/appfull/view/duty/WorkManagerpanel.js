Ext.define('Webdesktop.view.duty.WorkManagerpanel', {
    extend: 'Ext.grid.Panel',
    alias:'widget.workmanagerpanel',
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


                {header: '值班日', dataIndex: 'day',width: 150,
                    renderer:function(val, obj, record){
                       if(val==0) return '星期天';
                       else if(val==1) return '星期一';
                       else if(val==2) return '星期二';
                       else if(val==3) return '星期三';
                       else if(val==4) return '星期四';
                       else if(val==5) return '星期五';
                       else if(val==6) return '星期六';

                    }

                },
                {header: '姓名', dataIndex: 'displayname',width: 250}

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
                    action:'del',
                    hidden: !Globle.isadmin

                }
            ],

            store: 'duty.WorkManagers'


        });
        me.callParent(arguments);
    }
});