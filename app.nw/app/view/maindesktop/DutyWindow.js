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

    //id:'grid-win',
    alias:'widget.duty-win',
    appType:'duty-win',

    init : function(){
        this.launcher = {
            text: '值班管理',
            iconCls:'icon-duty'
        };
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('grid-win');
        if(!win){
            win = desktop.createWindow({
                id: 'duty-win',
                //alias:'widget.dutywind',
                title:'值班管理',
                width:740,
                height:480,
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

                    //Ext.widget('testgrid')
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

