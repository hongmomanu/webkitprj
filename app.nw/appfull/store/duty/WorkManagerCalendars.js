Ext.define('Webdesktop.store.duty.WorkManagerCalendars', {
    extend: 'Extensible.calendar.data.MemoryCalendarStore',
    //model: 'Webdesktop.model.duty.WorkManager',
    //alias : 'widget.workmanagerevents',

    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: CommonFunc.geturl()+'duty/getcalendars',
        noCache: false,
        reader: {
            type: 'json',
            root: 'results'
        }
    }

});