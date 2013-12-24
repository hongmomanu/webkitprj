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
Ext.define('Webdesktop.view.server.AppPortChartWin', {
    extend: 'Ext.window.Window',
    alias : 'widget.appportchartwin',
    requires: [
        //'Ext.form.*'
    ],
    initComponent: function() {
        Ext.apply(this, {
            height: 380,
            width: 600,
            animCollapse:false,
            stateful: false,
            isWindow: true,
            constrainHeader: true,
            minimizable: true,
            maximizable: true,
            layout: 'fit'

        });
        this.callParent(arguments);
    }

});