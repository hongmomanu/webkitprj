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
Ext.define('Webdesktop.view.user.Lockwin', {
    extend : 'Ext.window.Window',
    alias  : 'widget.webdesktop_lockwin',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            title     : '锁屏',
            //width:      300,
            autoShow  : true,
            modal     :true,
            closable  :false,
            resizable :false,
            constrain : true,
            draggable:false,
            items     : {
                xtype       : 'form',
                border      : false,
                bodyPadding : 10,
                defaultType : 'textfield',
                items       : [{
                        name       : 'username',
                        labelWidth:80,
                        width:250,
                        fieldLabel : '当前活动用户',
                        readOnly:true,
                        value:Globle.username,
                        allowBlank : false
                    },
                    {
                        name       : 'password',
                        labelWidth:80,
                        width:250,
                        fieldLabel : '请输入密码',
                        allowBlank : false
                    }
                ],
                buttons: [{
                    text     : '解锁',
                    action:'unlockwin',
                    formBind : true, //only enabled once the form is valid
                    disabled : true
                }]
            }
        });

        me.callParent();
    }
});