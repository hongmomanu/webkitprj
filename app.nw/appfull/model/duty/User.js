/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.duty.User', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'username',
            type:'string'
        },
        {
            name:'userid',
            type:'int'
        },
        {
            name: 'displayname',
            type:'string'
        },
        {
            name: 'time',
            type:'string'
        }


    ]
});

