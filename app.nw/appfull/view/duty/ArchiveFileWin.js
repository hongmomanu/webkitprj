/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.ArchiveFileWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.archivefilewin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '归档文件和事件文件检查',
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
                        xtype: 'textarea',
                        allowBlank:false,
                        fieldLabel: '台站列表',
                        name: 'earthplatformlist'
                    },
                    {
                        xtype: 'textfield',
                        allowBlank:false,
                        fieldLabel: '文件异常筏值',
                        name: 'archiveminsize'
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
                        text: '检测',
                        action: 'check'
                    }
                ],
                border: false

            }

        });
        this.callParent(arguments);
    }

});