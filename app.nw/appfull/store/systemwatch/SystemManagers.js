Ext.define('Webdesktop.store.systemwatch.SystemManagers', {
    //extend: 'Ext.data.Store',
    extend: 'Ext.data.TreeStore',
    model: 'Webdesktop.model.systemwatch.SystemManager',
    alias : 'widget.systemmanagers',

    pageSize: 10000,
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'server/getsystems'
    },
    root: {
        servername: '浙江省地震局',
        //divisionpath:'杭州市地震局',
        id:-1,
        expanded: true
    }

});