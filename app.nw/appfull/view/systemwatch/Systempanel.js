Ext.define('Webdesktop.view.systemwatch.Systempanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.systempanel',
    //layout: 'fit',

    requires: [
    ],



    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            border: true,
            itemId:'systempanel',
            html:'<div id="SystemDiagram"  style="width: 100%;height: 100%;"></div>',
            tbar: [

                {
                    xtype: 'splitbutton',
                    text: '系统监视管理',
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

                        }
                    ]

                }


            ]
        });
        me.callParent(arguments);
    }
});