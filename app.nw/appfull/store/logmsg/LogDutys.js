Ext.define('Webdesktop.store.logmsg.LogDutys', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.logmsg.LogDuty',
    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'log/getlogduty',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }

});