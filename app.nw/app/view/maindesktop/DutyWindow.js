/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Webdesktop.view.maindesktop.DutyWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        ''
    ],

    id:'dutywin',
    alias:'widget.dutywin',
    appType:'dutywin',

    init : function(){
        this.launcher = {
            text: '值班管理',
            iconCls:'icon-duty'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dutywin');
        if(!win){
            win = desktop.createWindow({
                id: 'dutywin',
                //alias:'widget.dutywind',
                title:'值班管理',
                width:740,
                height:480,
                maximizable :true,
                maximized:true,
                iconCls: 'icon-duty',
                animCollapse:false,
                constrainHeader:true,
                buttons: [

                    {
                        text: '添加',
                        action: 'add'

                    }
                ],

                layout: 'fit',
                items: [

                    {
                        region: "center",
                        xtype: 'tabpanel',
                        tabBar: {
                            hidden: true
                        },

                        items: [
                            {

                                layout: "border",


                                items: [
                                    {
                                        region: 'west',
                                        id: 'west-panel', // see Ext.getCmp() below
                                        title: '台网值班管理',
                                        split: false,
                                        listeners: {
                                            afterrender: function (panel) {
                                                //panel.getEl().addCls('custom-header');
                                            }
                                        },
                                        width: 204,
                                        minWidth: 175,
                                        maxWidth: 400,
                                        collapsible: true,
                                        animCollapse: true,
                                        margins: '0 0 0 0',
                                        layout: 'accordion',
                                        items: [{
                                            icon:'app/images/member.png',
                                            title: '值班人员管理',
                                            html: 'Panel content!'
                                        },{
                                            title: '日常工作管理',
                                            html: 'Panel content!'
                                        },{
                                            title: '系统提醒管理',
                                            html: 'Panel content!'
                                        }]
                                    },

                                    Ext.create('Ext.tab.Panel', {
                                        region: 'center', // a center region is ALWAYS required for border layout
                                        //deferredRender: false,
                                        layout:'fit',
                                        id: 'mainContent-panel',
                                        closeAction:'hide',
                                        activeTab: 0,     // first tab initially active
                                        items: [
                                            {
                                                title:'测试',
                                                html: 'hello jack'
                                            }
                                        ]
                                    })
                                ]
                            }
                        ]
                    }

                ],
                tbar:[{
                    text:'新增值班任务',
                    tooltip:'Add a new row',
                    action:'add',
                    iconCls:'add'
                }, '-', {
                    text:'属性',
                    tooltip:'Modify options',
                    iconCls:'option'
                },'-',{
                    text:'删除值班任务',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                }]
            });
        }
        return win;
    },

    statics: {

    }
});

