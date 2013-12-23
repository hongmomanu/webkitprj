/**
 * Created by jack on 13-12-20.
 */
Ext.define('Webdesktop.store.server.AppPortCharts', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.server.AppPortChart',
    autoLoad:true,


    proxy: {
        type: 'ajax',
        url: CommonFunc.geturl()+'serverport'
        //getMethod:function(request){ return 'POST'; },
        /*extraParams:{
            businesstype:businessTableType.dbgl
        },*/
        /*reader: {
            type: 'json'
        }*/
    }
});