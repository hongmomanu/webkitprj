Ext.define('Webdesktop.store.duty.DutyMissions', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.duty.DutyMission',
    alias : 'widget.usermanagers',

    pageSize: 10000,
    autoLoad:true,
    proxy:{
        type: 'ajax',
        extraParams:{
            day:Ext.util.Format.date(new Date(), "Y-m-d")
        },
        url:CommonFunc.geturl()+'getdutymissions'
    }

});