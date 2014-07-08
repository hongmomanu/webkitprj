/**
 * Created by jack on 14-2-18.
 */
Ext.define('Webdesktop.model.duty.StationManager', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'stationname',
            type:'string'
        },{
            name: 'networkname',
            type:'string'
        },{
            name: 'networkcode',
            type:'string'
        },
        {
            name:'stationcode',
            type:'string'
        },
        {
            name:'geom',
            type:'string'
        },
        {
            name:'dataaddr',
            type:'string'
        },
        {
            name:'gatewayaddr',
            type:'string'
        },
        {
            name:'connecttype',
            type:'string'
        },
        {
            name:'contact',
            type:'string'
        },
        {
            name:'phone',
            type:'string'
        },
        {
            name: 'id',
            type:'int'
        },
        {
            name: 'crossnums',
            type:'int'
        }


    ]
});

