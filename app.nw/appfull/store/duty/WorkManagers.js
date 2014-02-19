Ext.define('Webdesktop.store.duty.WorkManagers', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.duty.WorkManager',
    alias : 'widget.workmanagers',

    pageSize: 10000,
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'getworkmanagers'
    }

});