Ext.define('Webdesktop.store.duty.Users', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.duty.User',
    alias : 'widget.userslist',

    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: Globle.iswebapp?"":localStorage.serverurl+'users'
    }

});