Ext.define('Webdesktop.store.logmsg.LogSystems', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.logmsg.LogSystem',
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'log/getlogsystem',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }

});