Ext.define('Webdesktop.view.logmsg.LogSystemStaticsChart', {
    extend: 'Ext.chart.Chart',
    alias:'widget.logsystemstaticschart',
    layout: 'fit',
    requires: [
    ],

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            animate: true,
            shadow: true,
            store: 'logmsg.LogSystemStatics',
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['counts'],
                title: false,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['date'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'date',
                yField: ['counts'],
                tips: {
                    trackMouse: true,
                    width: 580,
                    height: 170,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [
                            {

                                xtype:'logpiestaticschart'
                            },
                            {
                                xtype:'loggridchart'
                            }
                        ]
                    },
                    renderer: function(klass, item) {
                        var storeItem = item.storeItem;
                        var params={
                            day:storeItem.get('date')
                        };

                        var successFunc = function (response, action) {
                            var res = Ext.JSON.decode(response.responseText);
                            Ext.getStore('logmsg.LoggridpieCharts').loadData(res);

                        };
                        var failFunc = function (form, action) {
                            Ext.Msg.alert("提示信息", "获取信息失败!");
                        };
                        CommonFunc.ajaxSend(params,'log/logsystemstaticsinfobyday',successFunc,failFunc,'GET');

                    }


                }
            }]


        });
        me.callParent(arguments);
    }
});