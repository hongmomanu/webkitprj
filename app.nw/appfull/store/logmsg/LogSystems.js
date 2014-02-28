Ext.define('Webdesktop.store.logmsg.LogSystems', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.logmsg.LogSystem',
    //alias : 'widget.userslist',

    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'log/getlogsystem'
    }

});