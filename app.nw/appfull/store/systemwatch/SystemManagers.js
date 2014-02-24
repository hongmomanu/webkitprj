Ext.define('Webdesktop.store.systemwatch.SystemManagers', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.systemwatch.SystemManager',
    alias : 'widget.systemmanagers',

    pageSize: 10000,
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'getsystems'
    }

});