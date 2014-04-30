Ext.define('Webdesktop.view.user.UserManagerpanel', {
    extend: 'Ext.grid.Panel',
    alias:'widget.usermanagerpanel',
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

            //view: new Ext.grid.GridView({ scrollToTop: Ext.emptyFn }),

            //hideHeaders:true,
            columns: [



                {header: '姓名', dataIndex: 'displayname'},
                {header: '登录名', dataIndex: 'username'},
                {header: '电话号码', dataIndex: 'telnum'},
                {header: '登陆密码', dataIndex: 'password'}

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
                    //disabled:true,
                    action:'del',
                    hidden: !Globle.isadmin

                }
            ],

            store: 'user.Users'


        });
        me.callParent(arguments);
    }
});