/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.systemwatch.SystemAlertManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.systemalertmanagerwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '报警消息管理',
            height: 360,
            width: 520,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: [{
                xtype: 'form',

                layout: {
                    type: 'vbox',

                    align: 'stretch'
                },
                border: false,
                bodyPadding: 10,
                //xtype: 'fieldset',

                fieldDefaults: {
                    labelAlign: 'top',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },

                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: '刷新时间',
                        queryMode: 'local',
                        displayField: 'name',
                        store:  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":60000, "name":"1分钟"},
                                {"value":300000, "name":"5分钟"},
                                {"value":15*60000, "name":"15分钟"},
                                {"value":30*60000, "name":"30分钟"},
                                {"value":60*60000, "name":"1小时"},
                                {"value":120*60000, "name":"2小时"},
                                {"value":180*60000, "name":"3小时"},
                                {"value":240*60000, "name":"4小时"},
                                {"value":300*60000, "name":"5小时"}
                            ]
                        }),
                        valueField: 'value',
                        name: 'alertinterval'
                    },
                    {
                        xtype: 'numberfield',
                        anchor: '100%',
                        name: 'alertmempercent',
                        fieldLabel: '内存报警百分比（低于)',
                        maxValue: 30,
                        minValue: 1
                    },
                    {
                        xtype: 'numberfield',
                        anchor: '100%',
                        name: 'alertdiskpercent',
                        fieldLabel: '磁盘报警百分比（低于)',
                        maxValue: 30,
                        minValue: 1
                    }

                ],
                buttons: [
                    {
                        text: '关闭',
                        handler: function () {
                            this.up('window').hide();
                        }
                    } ,
                    {
                        text: '保存',
                        action: 'save'

                    }
                ],
                border: false

            }]

        });
        this.callParent(arguments);
    }

});