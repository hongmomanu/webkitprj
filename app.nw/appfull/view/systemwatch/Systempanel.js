Ext.define('Webdesktop.view.systemwatch.Systempanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.systempanel',
    //layout: 'fit',

    requires: [
    ],



    initComponent: function () {
        var me = this;
        var url=CommonFunc.geturl();
        Ext.apply(me, {
            border: true,
            itemId:'systempanel',
            html:'<div id="SystemDiagram"  style="width: 100%;height: 100%;"></div>' +
                '<div id="SysteminfoBox"></div>',
            tbar: [

                {
                    xtype: 'splitbutton',
                    text: '系统监视管理',
                    hidden: !Globle.isadmin,
                    menu: [
                        {
                            text: '系统服务器配置',
                            action: 'systemmanager',
                            hidden: !Globle.isadmin
                        },{
                            text: '报警信息配置',
                            action: 'systemalertmanager',
                            hidden: !Globle.isadmin
                        }
                    ]

                },
                {
                    xtype: 'image' ,
                    src:'images/refresh.png',
                    height:20,
                    overCls:'overhand',
                    listeners: {

                        render: function(cmp) {
                            Ext.create('Ext.tip.ToolTip', {
                                target: cmp.el,
                                html: "<b>刷新</b><br> "
                            });

                            cmp.getEl().on('click', function(){ this.fireEvent('refreshclick', cmp); }, cmp);
                        }
                    }

                }


            ]
        });
        me.callParent(arguments);
    }
});