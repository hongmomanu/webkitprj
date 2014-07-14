/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.duty.DutyManagerWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.dutymanagerwin',
    requires: [
        'Ext.Window',
        'Extensible.calendar.data.MemoryEventStore',
        'Extensible.calendar.CalendarPanel'
    ],
    initComponent: function() {
        Ext.apply(this, {
            title: '值班排班',
            height: 500,
            width: 800,
            closeAction : 'hide',
            tbar: [
                {
                    xtype: 'button',
                    action:'print',
                    text:'打印'
                }
            ],
            modal:true,
            resizable:false,
            layout: 'fit',
            items: {
                //xtype:'workmanagerpanel'
                id:'workcalendarpanel',
                xtype: 'extensible.calendarpanel',
                readOnly :!Globle.isadmin,
                eventStore: Ext.create('Webdesktop.store.duty.WorkManagerEvents'),
                calendarStore:Ext.create('Webdesktop.store.duty.WorkManagerCalendars')
            }

        });
        this.callParent(arguments);
    }

});