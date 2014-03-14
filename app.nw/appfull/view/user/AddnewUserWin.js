/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.user.AddnewUserWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewuserwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '新增用户',
            height: 420,
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
                        fieldLabel: '用户登陆名',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'username'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '姓名',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'displayname'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '手机号码',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'telnum'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '登陆密码',
                        required:true,
                        inputType:'password',
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'password'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '密码确认',
                        inputType:'password',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        validator: function(value) {
                            var password1 = this.previousSibling('[name=password]');
                            return (value === password1.getValue()) ? true : '前后密码不匹配.'
                        },
                        name: 'passwordagain'
                    },{
                        xtype: 'combobox',
                        queryMode: 'local',
                        displayField: 'name',
                        store:  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":0, "name":"否"},
                                {"value":1, "name":"是"}
                            ]
                        }),
                        value:0,
                        valueField: 'value',
                        fieldLabel:'是否管理员',
                        name: 'admin'
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