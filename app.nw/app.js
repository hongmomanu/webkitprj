Ext.Loader.setPath({
    //'Ext.ux.desktop': 'app/js',
    'Ext.ux':'extjs4.2.1/ux',
    "Extensible": "extjs4.2.1/ux/extensible-1.5.2/src",
    "Extensible.example": "extjs4.2.1/ux/extensible-1.5.2/examples"
    //Webdesktop: 'app'
});



Ext.application({
    //requires: ['Webdesktop.App'],
    name: 'Webdesktop',

    appFolder: 'appfull',

    controllers: [
        'Users','Duty','Systemwatch','Logmsg'
    ],

    launch: function() {

        /**初始化登陆窗口***/
        Ext.widget('webdesktop_login');


    }
});