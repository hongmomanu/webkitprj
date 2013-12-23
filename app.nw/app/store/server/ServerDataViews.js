/**
 * Created by jack on 13-12-20.
 */
Ext.define('Webdesktop.store.server.ServerDataViews', {
    extend: 'Ext.data.Store',
    alias : 'widget.serverdataviews',
    model: 'Webdesktop.model.server.ServerDataView',
    autoLoad:true,

    pageSize: 25,
    /*listeners: {
        load: function(store, node, records) {
            store.sort('servername', 'ASC');
        }
    },*/
    proxy: {
        type: 'ajax',
        url: CommonFunc.geturl()+'serverlist',
        //getMethod:function(request){ return 'POST'; },
        /*extraParams:{
            businesstype:businessTableType.dbgl
        },*/
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        }
    }
});