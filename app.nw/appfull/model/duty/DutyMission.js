/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.duty.DutyMission', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'missionname',
            type:'string'
        },
        {
            name: 'missiontime',
            type:'string'
        },
        {
            name:'missionstatus',
            type:'int'
        },
        {
            name: 'missionid',
            type:'int'
        },
        {
            name: 'time',
            type:'string'
        }


    ]
});

