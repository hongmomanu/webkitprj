Ext.define('Webdesktop.store.duty.MissionManagers', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.duty.MissionManager',
    alias : 'widget.missionmanagers',

    pageSize: 10000,
    autoLoad:true,
    proxy:{
        type: 'ajax',
        url: CommonFunc.geturl()+'getmissions'
    }

});