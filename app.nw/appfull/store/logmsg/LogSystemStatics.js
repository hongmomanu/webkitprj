Ext.define('Webdesktop.store.logmsg.LogSystemStatics', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.logmsg.LogSystemStatic',
    alias:'widget.logsystemstatics',
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'log/logsystemstatics',
        reader: {
            type: 'json'

        }
    }

});