/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.realstream.RealStream', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'stationname',
            type:'string'
        },

        {
            name: 'time',
            type:'string'
        },
        {
            name: 'data',
            type:'string'
        }


    ]
});

