/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.WaveformCopyWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.waveformcopywin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '波形归档备份',
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
                        fieldLabel: '源文件夹',
                        name: 'sourcefolder'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '目标文件夹',
                        name: 'targetfolder'
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
                        text: '拷贝',
                        action: 'add'
                    }
                ],
                border: false

            }

        });
        this.callParent(arguments);
    }

});