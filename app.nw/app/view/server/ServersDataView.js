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
Ext.define('Webdesktop.view.server.ServersDataView', {
    extend : 'Ext.view.View',
    alias  : 'widget.serversdataview',

    initComponent: function() {
        var me = this;


        Ext.apply(me, {
            deferInitialRefresh: false,
            store: 'server.ServerDataViews',
            tpl  : Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                '<div class="server">',
                (!Ext.isIE6? '<img width="64" height="64" src="app/images/{[values.isping?"grid.png":"grid.png"]}" />' :
                    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'app/images/grid.png\',sizingMethod=\'scale\')"></div>'),
                '<strong>{servername}</strong>',
                //'<span>{price:usMoney} ({reviews} Review{[values.reviews == 1 ? "" : "s"]})</span>',
                '</div>',
                '</tpl>'
            ),
            trackOver: true,
            plugins : [
                Ext.create('Ext.ux.DataView.Animated', {
                    duration  : 550,
                    idProperty: 'id'
                })
            ],

            listeners: {
                selectionchange: function(dv, nodes ){
                    if(nodes[0]){

                        var win = Ext.create('Ext.Window', {
                            width: 600,
                            height: 380,
                           /* minHeight: 380,
                            minWidth: 550,*/
                            hidden: false,
                            shadow: false,
                            maximizable: true,
                            style: 'overflow: hidden;',
                            title: '端口测试',
                            layout: 'fit',
                            items: Ext.widget('appportchart')
                        });
                        win.show();

                        //testobj=nodes[0];

                    }
                }
            },

            id: 'servers',

            itemSelector: 'div.server',
            overItemCls : 'server-hover',
            multiSelect : false,
            autoScroll  : true
        });

        me.callParent();
    }
});