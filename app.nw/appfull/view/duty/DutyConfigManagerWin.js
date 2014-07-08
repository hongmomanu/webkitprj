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
            height: 480,
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
                    labelAlign: 'left',
                    labelWidth: 100,
                    labelStyle: 'font-weight:bold'
                },

                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: '值班刷新间隔',
                        queryMode: 'local',
                        displayField: 'name',
                        value:60000,
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
                        xtype: 'combobox',
                        fieldLabel: '测站刷新间隔',
                        queryMode: 'local',
                        displayField: 'name',
                        value:30000,
                        store:  Ext.create('Ext.data.Store', {
                            fields: ['value', 'name'],
                            data : [
                                {"value":60000, "name":"1分钟"},
                                {"value":30000, "name":"30秒钟"},
                                {"value":10000, "name":"10秒钟"}
                            ]
                        }),
                        valueField: 'value',
                        name: 'stationinterval'
                    },
                    {
                        xtype:'textfield',
                        value:50,
                        name:'crossalert',
                        fieldLabel:'偏离度告警阀值(%)'
                    },
                    {
                        xtype:'textfield',
                        value:'http://10.5.160.37:8180/gonggao/news.jsp',
                        name:'eqimurl',
                        fieldLabel:'eqim地址'
                    },
                    {
                        xtype:'textfield',
                        value:'http://10.33.253.103:8080/JOPENSWeb/mon/logStation',
                        name:'recordurl',
                        fieldLabel:'断记地址'
                    },{
                        xtype:'textfield',
                        name:'reporturl',
                        value:'http://10.5.202.22/bianmu/signon_rec.jsp',
                        fieldLabel:'快报地址'
                    },{
                        xtype:'textfield',
                        value:'http://10.5.202.22/bianmu/validate.jsp',
                        name:'reportloginurl',
                        fieldLabel:'快报登陆地址'
                    },
                    {
                        xtype:'textfield',
                        value:'ZJ33',
                        name:'reportusername',
                        fieldLabel:'快报用户名'
                    },
                    {
                        xtype:'textfield',
                        name:'reportpassword',
                        value:'123456',
                        fieldLabel:'快报密码'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '波形文件夹',
                        value:'/Users/au2/2014/',
                        name: 'wavedir'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '事件文件夹',
                        value:'/Users/au2/2014evt/',
                        name: 'eventdir'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '文件异常值',
                        value:'100',
                        name: 'archiveminsize'
                    },{
                        xtype: 'textfield',
                        value:'13336151145',
                        fieldLabel: '编目人员电话号码',
                        name: 'catalogtel'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '目标文件夹',
                        hidden:true,
                        name: 'targetdir'
                    }


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