/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.AddNewWorkWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.addnewworkwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '新增值班',
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
                        xtype: 'combobox',
                        fieldLabel: '值班日',
                        queryMode: 'local',
                        displayField: 'name',
                        store:  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":1, "name":"星期一"},
                                {"value":2, "name":"星期二"},
                                {"value":3, "name":"星期三"},
                                {"value":4, "name":"星期四"},
                                {"value":5, "name":"星期五"},
                                {"value":6, "name":"星期六"},
                                {"value":0, "name":"星期日"}
                            ]
                        }),
                        valueField: 'value',
                        name: 'day'
                    },
                    {
                        xtype: 'combobox',
                        valueField: 'userid',
                        store:Ext.widget('userslist'),
                        displayField: 'displayname',
                        fieldLabel: '值班人员',
                        name: 'userid'
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