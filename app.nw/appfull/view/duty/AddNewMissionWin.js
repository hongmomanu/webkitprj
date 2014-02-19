/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.AddNewMissionWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewmissionwin',
    requires: [
    ],
    initComponent: function() {
        var required = '<span style="color:red;font-weight:bold" data-qtip="必填字段">*</span>';
        Ext.apply(this, {
            title: '新增值班任务',
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
                        fieldLabel: '任务名称',
                        required:true,
                        allowBlank:false,
                        afterLabelTextTpl: required,
                        name: 'missionname'
                    },
                    {
                        xtype: 'timefield',
                        fieldLabel: '提醒时间',
                        minValue: '6:00',
                        maxValue: '18:00',
                        increment: 30,
                        name: 'missiontime'
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