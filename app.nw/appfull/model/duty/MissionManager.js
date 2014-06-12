/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.duty.MissionManager', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'missionname',
            type:'string'
        },
        {
            name: 'missionlabel',
            type:'string'
        },
        {
            name: 'missioninterval',
            type:'string'
        },
        {
            name:'missiontime',
            type:'string'
        },
        {
            name: 'missionid',
            type:'int'
        }


    ]
});

