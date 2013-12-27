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
Ext.define('Webdesktop.view.server.MemoryChart', {
    extend : 'Ext.chart.Chart',
    alias  : 'widget.appmemchart',
    refreshRate: 3500,
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
                animate: true,
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
                store: 'server.MemoryCharts',
                shadow: true,
                legend: {
                    position: 'right'
                },
                insetPadding: 40,
                theme: 'Memory:gradients',
                series: [{
                    donut: 30,
                    type: 'pie',
                    field: 'memory',
                    showInLegend: true,
                    getLegendColor: function(index) {
                        var me = this,
                            colorLength = 0;

                        me.colorArrayStyle = [ '#115fa6','#94ae0a'];
                        colorLength = me.colorArrayStyle.length;
                        if (me.style && me.style.fill) {
                            return me.style.fill;
                        } else {
                            return me.colorArrayStyle[index % colorLength];
                        }
                    },
                    tips: {
                        trackMouse: true,
                        width: 140,
                        height: 28,
                        renderer: function(storeItem, item) {
                            //calculate percentage.
                            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('memory')* 100) + '%');
                        }
                    },
                    highlight: {
                        segment: {
                            margin: 20
                        }
                    },
                    renderer: function(sprite, record, attr, index, store) {
                        var colormap={"未使用":'#94ae0a',"已使用":'#115fa6'};
                        var color = colormap[record.get('name')];
                        //var value = (record.get('data1') >> 0) % 9;
                        //var color = [ "#94ae0a", "#115fa6","#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"][4];
                        return Ext.apply(attr, {
                            fill: color
                        });
                    },
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true,
                        font: '18px Arial'
                    }
                }]
            }
        );

        me.callParent();
    }

});