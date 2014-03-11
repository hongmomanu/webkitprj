/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.DutyManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.dutymanagerwin',
    requires: [
        'Ext.Window',
        'Extensible.calendar.data.MemoryEventStore',
        'Extensible.calendar.CalendarPanel',

        'Extensible.example.calendar.data.Events'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '值班排班',
            height: 500,
            width: 800,
            closeAction : 'hide',
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                //xtype:'workmanagerpanel'
                xtype: 'extensible.calendarpanel',
                eventStore: Ext.create('Webdesktop.store.duty.WorkManagerEvents'),
                calendarStore:Ext.create('Webdesktop.store.duty.WorkManagerCalendars')
            }

        });
        this.callParent(arguments);
    }

});