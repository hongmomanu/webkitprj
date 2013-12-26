/**
 * Created by jack on 13-12-20.
 */
Ext.define('Webdesktop.store.server.MemoryCharts', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.server.MemoryChart',
    autoLoad:true,


    proxy: {
        type: 'ajax',
        url: CommonFunc.geturl()+'getmemoryratio'
        //getMethod:function(request){ return 'POST'; },
        /*extraParams:{
            businesstype:businessTableType.dbgl
        },*/
        /*reader: {
            type: 'json'
        }*/
    }
});