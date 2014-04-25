/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.user.User', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'username',
            type:'string'
        },
        {
            name:'userid',
            type:'int'
        },{
            name:'id',
            type:'int'
        },
        {
            name: 'displayname',
            type:'string'
        },
        {
            name: 'password',
            type:'string'
        },
        {
            name: 'telnum',
            type:'string'
        },
        {
            name: 'time',
            type:'string'
        }


    ]
});

