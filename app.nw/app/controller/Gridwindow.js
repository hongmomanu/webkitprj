/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Gridwindow', {
    extend: 'Ext.app.Controller',
    views: [
        'Webdesktop.GridWindow',
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'Webdesktop.SystemStatus',
        'Webdesktop.VideoWindow',

        'Webdesktop.TabWindow',
        'Webdesktop.AccordionWindow',
        'Webdesktop.Notepad',
        'Webdesktop.BogusMenuModule',
        'Webdesktop.BogusModule',

//        'Webdesktop.Blockalanche',
        'Webdesktop.Settings',
        'TestGrid'
    ],

    init: function() {

        console.log('Initialized Users! This happens before the Application launch function is called');

        this.control({
            'testgrid button[action=add]':{
                click: function(){alert(1);}

            }
        });

    },
    add:function(btn){
        alert("done");
    }
});
