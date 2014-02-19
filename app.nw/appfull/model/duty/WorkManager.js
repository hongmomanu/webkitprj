/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.duty.WorkManager', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'day',
            type:'string'
        },
        {
            name:'username',
            type:'string'
        },
        {
            name:'displayname',
            type:'string'
        },
        {
            name: 'userid',
            type:'int'
        },
        {
            name: 'enumid',
            type:'int'
        }


    ]
});

