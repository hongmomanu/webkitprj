/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.OnDuty', {
    extend: 'Ext.app.Controller',
    views: [
        'maindesktop.DutyWindow',
        'Ext.ux.desktop.ShortcutModel',

        'maindesktop.SystemStatus',
        'maindesktop.VideoWindow',
        'maindesktop.BogusMenuModule',
        'maindesktop.BogusModule',
        'maindesktop.Settings'
        //'Ext.window.MessageBox',
        //'maindesktop.TabWindow',
        //'maindesktop.AccordionWindow',
        //'maindesktop.Notepad',
//        'Webdesktop.Blockalanche',

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
