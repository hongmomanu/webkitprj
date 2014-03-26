Ext.define('Webdesktop.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias:'widget.viewport',
    layout: 'fit',

    requires: [
    ],
    listeners: {
        show: function(panel) {
            //this.fireEvent('gridshowfresh',this);
            //alert("fired");
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
                                    title:'地震实时数据流处理',
                                    layout:'fit',
                                    collapsible: false,
                                    items:[
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'border',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                split: true,
                                                //collapsible: true,
                                                animCollapse: true
                                            },
                                            items:[
                                                {
                                                    //xtype:'realseedchart',
                                                    xtype:'realstreamgrid',
                                                    region:'west',
                                                    flex:0.3
                                                },
                                                {
                                                    xtype:'realstreammappanel',

                                                    region:'center',
                                                    flex:0.7
                                                }
                                            ]

                                        }
                                    ],

                                    tools: [
                                        {
                                            type: 'maximize',
                                            tooltip:'窗口最大化',
                                            handler: function (a, b, c) {
                                                //console.log(c);
                                                //testobj=c;
                                                CommonFunc.maxpanel(c.up('panel').items.items[0],'地震实时数据流处理',c);
                                                //var panel=c.up('panel').down('container');
                                                //CommonFunc.maxpanel(panel,'地震实时数据流处理',c);
                                            }
                                        }
                                    ],

                                    region:'west',
                                    flex: 0.5
                                },
                                {
                                    xtype:'panel',
                                    title:'服务器状态监测',
                                    collapsible: false,
                                    layout:'fit',
                                    region:'center',
                                    flex: 0.5,
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
                                    title:'值班任务管理',
                                    layout:'fit',
                                    collapsible: false,
                                    items:[
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'border',
                                                align: 'stretch'
                                            },
                                            defaults: {
                                                split: true,
                                                //collapsible: true,
                                                animCollapse: true
                                            },
                                            items:[
                                                {
                                                    xtype:'dutypanel',
                                                    region:'center',
                                                    flex:1
                                                },
                                                {
                                                    xtype:'logmsgrid',
                                                    id:'logmsgrid',
                                                    region:'east',
                                                    flex:1

                                                }
                                            ]

                                        }
                                    ],
                                    tools: [
                                        {
                                            type: 'maximize',
                                            tooltip:'窗口最大化',
                                            handler: function (a, b, c) {
                                                //console.log(c.up('panel'));
                                                //testobj= c.up('panel');
                                                //var panel=c.up('panel').down('container');
                                                CommonFunc.maxpanel(c.up('panel').items.items[0],'值班任务管理',c);
                                            }
                                        }
                                    ],
                                    region:'center'

                                },
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    title:'系统日志',
                                    layout:'fit',
                                    collapsed: true,
                                    listeners: {
                                        beforeexpand: function(panel) {
                                            //this.fireEvent('gridshowfresh',this);
                                            //alert("fired");
                                            var store=panel.down('grid').getStore();
                                            var bgday=Ext.Date.format(new Date(panel.down('#bgday').getValue()),'Y-m-d');
                                            store.proxy.extraParams.bgday =bgday;
                                            store.proxy.extraParams.edday =panel.down('#edday').getValue();
                                            store.proxy.extraParams.keyword =panel.down('#keyword').getValue();
                                            store.proxy.extraParams.statustype =panel.down('#statustype').getValue();
                                            store.load();

                                        }
                                    },
                                    tools: [
                                        {
                                            type: 'maximize',
                                            tooltip:'窗口最大化',
                                            handler: function (a, b, c) {
                                                var panel=c.up('panel').down('panel');
                                                CommonFunc.maxpanel(panel,'系统日志',c);
                                            }
                                        }
                                    ],
                                    items:[
                                        {
                                            xtype:'logsystemgrid'


                                            /*
                                            xtype:'tabpanel',
                                            activeTab: 0,
                                            defaults: {
                                                listeners: {
                                                    activate: function(tab, eOpts) {
                                                        if(tab.getStore){
                                                            var store=tab.getStore();
                                                            var bgday=Ext.Date.format(new Date(tab.down('#bgday').getValue()),'Y-m-d');
                                                            store.proxy.extraParams.bgday =bgday;
                                                            store.proxy.extraParams.edday =tab.down('#edday').getValue();
                                                            store.load();
                                                        }
                                                    }
                                                }
                                            },
                                            items:[
                                                {
                                                    title:'系统监视日志管理',
                                                    xtype:'logsystemgrid'
                                                },
                                                {
                                                    title:'值班日志管理',
                                                    xtype:'logdutygrid'
                                                },{
                                                    title:'实时数据流日志管理',
                                                    html:''
                                                }
                                            ]*/
                                        }

                                    ],
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