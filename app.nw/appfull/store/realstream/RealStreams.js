Ext.define('Webdesktop.store.realstream.RealStreams', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.realstream.RealStream',
    autoLoad:false,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'realstream/getrealstream',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }

});