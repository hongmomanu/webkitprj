Ext.define('Webdesktop.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias:'widget.viewport',
    layout: 'fit',

    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
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
                                //collapsible: true,
                                animCollapse: true,
                                bodyPadding: 5
                            },
                            items: [
                                {
                                    xtype:'dutypanel',
                                    region:'west',
                                    flex: 1/*,
                                    html:'text'*/
                                },
                                {
                                    xtype:'panel',
                                    region:'center',
                                    flex: 1,
                                    html:'text'

                                }
                            ]
                        }, {
                            flex: 1,
                            region: 'center',
                            xtype: 'container',
                            layout: {
                                //type: 'hbox',
                                //align: 'stretch'
                                type:'fit'
                            },
                            items: [
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    html:'text'

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