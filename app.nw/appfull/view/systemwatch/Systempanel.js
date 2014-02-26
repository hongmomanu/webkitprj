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
                        }
                    ]

                },
                {
                    xtype: 'image' ,
                    src:'images/refresh.png',
                    height:20,
                    listeners: {
                        click: {
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function(){ console.log('click el'); }
                        }
                    }

                }


            ]
        });
        me.callParent(arguments);
    }
});