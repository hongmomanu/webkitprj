Ext.define('Webdesktop.store.user.Users', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.user.User',
    alias : 'widget.userslist',

    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'users'
    }

});