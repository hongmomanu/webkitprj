/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.systemwatch.AddNewSystemWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewsystemwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '新增服务器',
            height: 260,
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
                        text: '新增',
                        action: 'add'

                    }
                ],
                border: false

            }

        });
        this.callParent(arguments);
    }

});