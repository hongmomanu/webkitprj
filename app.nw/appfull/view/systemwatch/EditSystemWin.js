/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.systemwatch.EditSystemWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.editsystemwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '修改服务器',
            height: 310,
            width: 520,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
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
                        xtype: 'textfield',
                        fieldLabel: '服务器名称',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'servername'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '服务器地址',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'servervalue'
                    },
                    {
                        xtype: 'textfield',
                        itemId:'machinecss',
                        fieldLabel: '服务器图标',
                        name: 'machinecss'
                    },
                    {
                        xtype: 'textfield',
                        itemId:'username',
                        fieldLabel: '服务器登陆名',
                        name: 'username'
                    },
                    {
                        xtype: 'textfield',
                        itemId:'password',
                        fieldLabel: '服务器登陆密码',
                        name: 'password'
                    },
                    {
                        xtype:'combobox',
                        fieldLabel: '服务应用种类',
                        store:  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":0, "name":"端口服务"},
                                {"value":1, "name":"服务进程"}
                            ]}),
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        hidden:true,
                        name:'type'

                    }

                ],
                buttons: [
                    {
                        text: '取消',
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

            }

        });
        this.callParent(arguments);
    }

});