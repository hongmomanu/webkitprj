/**
 * Created by jack on 13-12-20.
 */
Ext.define('Webdesktop.model.server.ServerDataView', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'servername'},
        {name:'servervalue'},
        {name: 'id', type: 'int'}

    ]
});
