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
                        type: 'hbox',
                        align: 'stretch'
                    },

                    items:[
                        {
                            flex: 1,
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    html:'text'

                                },
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    html:'text'

                                }
                            ]
                        }, {
                            flex: 1,
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype:'panel',
                                    flex: 1,
                                    html:'text'

                                },
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