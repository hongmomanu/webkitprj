/**
 * The desktop login screen
 *
 * The login screen is in the first release not really used, because the login
 * is controlled by the acl of zend framework.
 * To use the login there are several things to check:
 *  - anonymous user must have access to webdesktop/index
 *  - GLOBAL_USER_CONFIG must be empty or some checks that validates the global var
 *  - never tested...
 *
 *  In the current implementation it only passes the user informations from the
 *  backend to the main desktop controller.
 *  This needs more attention, because it can be very useful for session timeouts
 *  and direct relogins.
 *
 * @author Andreas Mairhofer <andreas@classphp.de>
 * @verion 0.1
 * @package Webdesktop
 * @subpackage Webdesktop
 * @namespace Webdesktop.view.webdesktop
 * @see ExtJs4 <http://www.sencha.com>
 * @license     http://www.gnu.org/copyleft/gpl.html GNU General Public License version 3.0
 */

/**
 * @class Webdesktop.view.webdesktop.Login
 * @extends Ext.window.Window
 * @alias webdesktop_login
 */
Ext.define('Webdesktop.view.server.CpuChart', {
    extend : 'Ext.chart.Chart',
    alias  : 'widget.appcpuchart',
    refreshRate: 1500,
    updateCharts: function () {
        var me = this;
        clearTimeout(me.updateTimer);
        me.updateTimer = setTimeout(function() {
            testobj=me;
            me.getStore().load();
            me.updateCharts();
        }, me.refreshRate);
    },
    initComponent: function() {
        var me = this;
        Ext.apply(me,
            {
                flex: 1,
                xtype: 'chart',
                theme: 'Category1',
                animate: false,
                listeners: {
                    afterrender: {
                        fn: me.updateCharts,
                        delay: 100
                    },
                    destroy: function () {
                        //alert(2);
                        clearTimeout(me.updateTimer);
                        me.updateTimer = null;
                    },
                    scope: me
                },
                store: 'server.CpuCharts',
                legend: {
                    position: 'bottom'
                },
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    minimum: 0,
                    maximum: 100,
                    fields: ['cpu1'],
                    title: 'CPU 负载',
                    grid: true,
                    labelTitle: {
                        font: '13px Arial'
                    },
                    label: {
                        font: '11px Arial'
                    }
                }],
                series: [{
                    title: 'Cpu1',
                    type: 'line',
                    lineWidth: 4,
                    showMarkers: false,
                    fill: true,
                    axis: 'left',
                    xField: 'time',
                    yField: 'cpu1',
                    style: {
                        'stroke-width': 1
                    }
                },
                    {
                        title: 'Cpu2',
                        type: 'line',
                        lineWidth: 4,
                        showMarkers: false,
                        fill: true,
                        axis: 'left',
                        xField: 'time',
                        yField: 'cpu2',
                        style: {
                            'stroke-width': 1
                        }
                    },{
                        title: 'Cpu3',
                        type: 'line',
                        lineWidth: 4,
                        showMarkers: false,
                        fill: true,
                        axis: 'left',
                        xField: 'time',
                        yField: 'cpu3',
                        style: {
                            'stroke-width': 1
                        }
                    }]
            }
        );

        me.callParent();
    }

});