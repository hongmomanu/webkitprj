Ext.define('Webdesktop.store.duty.StationManagers', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.duty.StationManager',
    alias : 'widget.stationmanagers',

    autoLoad:true,
    pageSize: 9000,

    proxy:{
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        },
        url: CommonFunc.geturl()+'duty/getstations'
    }

});