/**
 * Created by jack on 13-12-20.
 */
Ext.define('Webdesktop.store.server.CpuCharts', {
    extend: 'Ext.data.Store',
    model: 'Webdesktop.model.server.CpuChart',
    autoLoad:true,


    proxy: {
        type: 'ajax',
        url: CommonFunc.geturl()+'getcpuratio'
        //getMethod:function(request){ return 'POST'; },
        /*extraParams:{
            businesstype:businessTableType.dbgl
        },*/
        /*reader: {
            type: 'json'
        }*/
    }
});