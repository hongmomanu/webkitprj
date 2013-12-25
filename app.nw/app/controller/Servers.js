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

            win = desktop.createWindow(
                {
                    title:title,
                    id:id,
                    animCollapse:false,
                    constrainHeader:true,
                    layout:'fit',
                    height: 380,
                    width: 600,
                    items:Ext.widget('appportchart')
                });
        }

        var store=win.down('#appprtchart').getStore();
        store.proxy.extraParams.serverid=record.get('id');
        store.proxy.extraParams.ip=record.get('servervalue');
        store.load({callback:function(){
            win.show();
        }});

    }

});
