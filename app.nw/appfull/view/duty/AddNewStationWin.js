/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.AddNewStationWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewstationwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '新增台站',
            height: 510,
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
                    labelAlign: 'left',
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
                    },{
                        xtype: 'textfield',
                        fieldLabel: '零点穿越筏值',
                        //required:true,
                        //allowBlank:false,
                        //afterLabelTextTpl: required,
                        name: 'crossnums'
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