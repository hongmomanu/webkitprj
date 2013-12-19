Ext.Loader.setPath({
    'Ext.ux.desktop': 'app/js',
    Webdesktop: 'app'
});



Ext.application({
    requires: ['Webdesktop.App'],
    name: 'Webdesktop',

    appFolder: 'app',

    controllers: [
        'Gridwindow','Users'
    ],

    launch: function() {

        /**初始化登陆窗口***/
        Ext.widget('webdesktop_login');
        //Ext.widget('maindesktopview');

    }
});