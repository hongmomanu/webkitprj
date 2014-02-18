Ext.Loader.setPath({
    //'Ext.ux.desktop': 'app/js',
    'Ext.ux':'extjs4.2.1/ux'
    //Webdesktop: 'app'
});



Ext.application({
    //requires: ['Webdesktop.App'],
    name: 'Webdesktop',

    appFolder: 'appfull',

    controllers: [
        'Users'
    ],

    launch: function() {

        /**初始化登陆窗口***/
        Ext.widget('webdesktop_login');


    }
});