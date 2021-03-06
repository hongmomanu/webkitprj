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
            //store: 'logmsg.LogSystemStatics',
            store:(function (me) {
                var s = Ext.widget('logsystemstatics');
                s.proxy.extraParams = {
                    type: me.searchtype,
                    bgday:me.bgday,
                    edday:me.edday
                }
                return s;
            })(this),
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

                    width: 600,
                    height: 300,
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
                            day:storeItem.get('date'),
                            searchtype:me.searchtype
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