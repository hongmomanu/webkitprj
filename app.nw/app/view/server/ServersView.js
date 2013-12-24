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
Ext.define('Webdesktop.view.server.ServersView', {
    extend : 'Ext.ux.desktop.Module',
    alias:'widget.serversview',
    appType:'serversview',
    /*listeners: {
        show: function(panel) {
            panel.down('#username').focus();
        }
    },*/

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('serversview');
        if(!win){
            win = desktop.createWindow({
                id: 'serversview',
                title:'系统监视',
                width:600,
                height:400,
                animCollapse:false,
                constrainHeader:true,
                //iconCls: 'notepad',
                border: false,
                //defaultFocus: 'notepad-editor', EXTJSIV-1300

                // IE has a bug where it will keep the iframe's background visible when the window
                // is set to visibility:hidden. Hiding the window via position offsets instead gets
                // around this bug.
                //hideMode: 'offsets',

                layout: 'fit',
                items:Ext.widget('serversdataview'),
                bbar:Ext.create('Ext.PagingToolbar',{
                    store: 'server.ServerDataViews'
                })

            });
        }
        return win;
    }


});