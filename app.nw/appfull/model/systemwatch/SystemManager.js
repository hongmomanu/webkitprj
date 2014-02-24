/**
 * Created by jack on 14-2-20.
 */
Ext.define('Webdesktop.model.systemwatch.SystemManager', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'servername',
            type:'string'
        },{
            name: 'servervalue',
            type:'string'
        },
        {
            name:'serverid',
            type:'int'
        }


    ]
});

