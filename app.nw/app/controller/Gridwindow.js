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
        'maindesktop.GridWindow',
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',

        'maindesktop.SystemStatus',
        'maindesktop.VideoWindow',

        'maindesktop.TabWindow',
        'maindesktop.AccordionWindow',
        'maindesktop.Notepad',
        'maindesktop.BogusMenuModule',
        'maindesktop.BogusModule',

//        'Webdesktop.Blockalanche',
        'maindesktop.Settings',
        'TestGrid'
    ],
    models:[
         'maindesktop.WallpaperModel'
    ],

    init: function() {

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
