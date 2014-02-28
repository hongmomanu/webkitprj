Ext.define('Webdesktop.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias:'widget.viewport',
    layout: 'fit',

    requires: [
    ],
    listeners: {
        show: function(panel) {
            //this.fireEvent('gridshowfresh',this);
            alert("fired");
        }
    },
    initComponent: function() {
        var me = this;
        Ext.apply(me, {

            items: [
                {

                    xtype: 'container',
                    layout: {
                        type: 'border',
                        align: 'stretch'
                    },
                    defaults: {
                        split: true,
                        //collapsible: true,
                        animCollapse: true,
                        bodyPadding: 5
                    },

                    items:[
                        {
                            flex: 1,
                            xtype: 'container',
                            region: 'north',

                            //xtype: 'container',
                            layout: {
                                type: 'border',
                                align: 'stretch'
                            },
                            defaults: {
                                split: true,
                                collapsible: true,
                                animCollapse: true,
                                bodyPadding: 5
                            },
                            items: [
                                {
                                    xtype:'panel',
                                    title:'值班监视管理窗口',
                                    layout:'fit',
                                    items:[
                                        {
                                         xtype:'dutypanel'
                                        }
                                    ],
                                    tools: [
                                        {
                                            type: 'maximize',
                                            tooltip:'窗口最大化',
                                            handler: function (a, b, c) {
                                                //console.log(c);
                                                //testobj=c;
                                                var panel=c.up('panel').down('panel');
                                                CommonFunc.maxpanel(panel,'值班任务管理',c);
                                            }
                                        }
                                    ],

                                    region:'west',
                                    flex: 1
                                },
                                {
                                    xtype:'panel',
                                    title:'服务器状态监测',
                                    collapsible: false,
                                    layout:'fit',
                                    region:'center',
                                    flex: 1,
                                    tools: [
                                        {
                                            type: 'maximize',
                                            tooltip:'窗口最大化',
                                            handler: function (a, b, c) {
                                                var panel=c.up('panel').down('panel');
                                                CommonFunc.maxpanel(panel,'系统监视窗口',c);
                                            }
                                        }
                                    ],
                                    items:[
                                        {
                                            xtype:'systempanel'
                                        }
                                    ]

                                }
                            ]
                        },
                        {
                            flex: 1,
                            region: 'center',
                            collapsible: true,
                            animCollapse: true,
                            xtype: 'container',
                            layout: {
                                type: 'border',
                                align: 'stretch'
                            },
                            defaults: {
                                split: true,
                                collapsible: true,
                                animCollapse: true,
                                bodyPadding: 5
                            },
                            items: [
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    layout:'fit',
                                    collapsible: false,
                                    html:'text',
                                    region:'center'

                                },
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    layout:'fit',
                                    html:'text',
                                    region:'east'

                                }

                            ]
                        }
                    ]
                    /*title: 'Users',
                    html : 'List of users will go here'*/
                }
            ]
        });
        me.callParent(arguments);
    }
});