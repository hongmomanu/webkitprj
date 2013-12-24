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
Ext.define('Webdesktop.view.server.AppPortChart', {
    extend : 'Ext.chart.Chart',
    alias  : 'widget.appportchart',
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            style: 'background:#fff',
            theme: 'Category2',
            //insetPadding: 30,
            animate: true,
            itemId:'appprtchart',
            store: 'server.AppPortCharts',

            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
                minimum: 0,
                maximum: 1,
                label: {
                    display: true
                }
            }],
            series: [{
                showInLegend: true,
                type: 'radar',
                xField: 'servername',
                yField: 'isconnect',
                title: '服务状态',
                style: {
                    opacity: 0.6,
                    'stroke-width': 3/*,
                    fill: 'none'*/
                }
            }]
        });

        me.callParent();
    }

});