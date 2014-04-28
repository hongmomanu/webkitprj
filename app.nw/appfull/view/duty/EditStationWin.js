/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.EditStationWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.editstationwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '编辑台站',
            height: 610,
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
                        fieldLabel: '台站名称',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'stationname'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'id',
                        hidden:true,
                        name: 'id'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '台网名称',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'networkname'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '台网代码',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'networkcode'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '台站代码',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'stationcode'
                    },

                    {
                        xtype: 'textfield',
                        fieldLabel: '显示位置',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'geom'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '数采地址',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        name: 'dataaddr'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '网关地址',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        name: 'gatewayaddr'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '通讯类型',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        name: 'connecttype'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '联系人',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        name: 'contact'
                    },{
                        xtype: 'textfield',
                        fieldLabel: '联系人电话',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        name: 'phone'
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