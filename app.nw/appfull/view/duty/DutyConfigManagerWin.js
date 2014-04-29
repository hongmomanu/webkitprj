/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.DutyConfigManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.dutyconfigmanagerwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '值班配置管理',
            height: 550,
            width: 500,
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
                                {"value":6000, "name":"6秒钟"},
                                {"value":60*60000, "name":"1小时"},
                                {"value":120*60000, "name":"2小时"},
                                {"value":180*60000, "name":"3小时"},
                                {"value":240*60000, "name":"4小时"},
                                {"value":300*60000, "name":"5小时"},
                                {"value":360*60000, "name":"6小时"}
                            ]
                        }),
                        valueField: 'value',
                        name: 'dutyalertinterval'
                    },
                    {
                        xtype:'textfield',
                        name:'eqimurl',
                        fieldLabel:'eqim地址'
                    },
                    {
                        xtype:'textfield',
                        name:'recordurl',
                        fieldLabel:'断记地址'
                    },
                    {
                        xtype:'textfield',
                        name:'eqimusername',
                        fieldLabel:'eqim用户名'
                    },
                    {
                        xtype:'textfield',
                        name:'eqimpassword',
                        fieldLabel:'eqim密码'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '波形文件夹',
                        name: 'wavedir'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '事件文件夹',
                        name: 'eventdir'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '文件异常值',
                        name: 'archiveminsize'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '源文件夹',
                        hidden:true,
                        name: 'sourcedir'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '目标文件夹',
                        hidden:true,
                        name: 'targetdir'
                    },


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