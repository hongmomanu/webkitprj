/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Servers', {
    extend: 'Ext.app.Controller',
    views: [
        'server.ServersView',
        'server.ServersDataView'
    ],

    init: function() {


        this.control({
            /*'webdesktop_login button[action=openconfigwin]':{
                click: this.openconfigwin

            }*/
        });


    }

});
