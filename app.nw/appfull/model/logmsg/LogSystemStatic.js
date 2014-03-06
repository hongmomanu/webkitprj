/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.logmsg.LogSystemStatic', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'date',
            type:'string'
        },
        {
            name:'counts',
            type:'int'
        }

    ]
});

