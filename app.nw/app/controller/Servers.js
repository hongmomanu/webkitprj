/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Servers', {
    extend: 'Ext.app.Controller',
    models:[
        'server.ServerDataView',
        'server.AppPortChart'
    ],
    stores:[
        'server.ServerDataViews'  ,
        'server.AppPortCharts'
    ],
    views: [
        'server.ServersView',
        'server.ServersDataView',
        'server.AppPortChartWin',
        'server.AppPortChart'
    ],

    init: function() {


        this.control({
            /*'webdesktop_login button[action=openconfigwin]':{
                click: this.openconfigwin

            }*/
            'serversdataview':{
                itemclick:this.showportwin

            }
        },this);


    },
    showportwin:function(view, record, item, index, e, eOpts){
        console.log(this.getController("Users"));
        var user_cl=this.getController("Users");
        var title=record.get('servername')+'('+record.get('servervalue')+')';
        var id='portwin'+record.get('id');
        var desktop=user_cl.desktop_widget.getDesktop();

        var win = desktop.getWindow(id);

        if(!win){

            win = desktop.createWindow(Ext.widget('appportchartwin',
                {
                    title:title,
                    id:id,
                    items:Ext.widget('appportchart')


                }),null,true);
            //win.items=Ext.widget('appportchart');
        }
        var store=win.down('#appprtchart').getStore();
        store.proxy.extraParams.serverid=record.get('id');
        store.proxy.extraParams.ip=record.get('servervalue');
        store.load({callback:function(){
            win.show();
        }});
        //win.show();
        /*var win = Ext.create('Ext.Window', {
            width: 600,
            height: 380,
            minHeight: 380,
            minWidth: 550,
            //hidden: false,
            shadow: true,
            maximizable: true,
            style: 'overflow: hidden;',
            title: record.get('servername')+'('+record.get('servervalue')+')',
            layout: 'fit',
            items: Ext.widget('appportchart')
        });
        var store=win.down('#appprtchart').getStore();
        store.proxy.extraParams.serverid=record.get('id');
        store.proxy.extraParams.ip=record.get('servervalue');
        store.load({callback:function(){
            win.show();
        }});
*/

    }

});
