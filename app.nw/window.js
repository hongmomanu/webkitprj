/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-16
 * Time: 下午4:33
 * To change this template use File | Settings | File Templates.
 */

/**窗口最大化**/
if(!Globle.iswebapp){
    var gui = require('nw.gui');
    var win = gui.Window.get();
    win.maximize();

    win.on('close', function() {
        //this.hide(); // Pretend to be closed already
        //console.log("We're closing...");
        var me=this;
        Ext.MessageBox.confirm('提示', '你确定关闭程序么?', function(btn){
            if(btn=="yes"){
                me.close(true);
            }else{

            }
        });


    });
    //var tray = new gui.Tray({ title: 'Tray', icon: 'images/app.png' });
    //var c = require('child_process');
    //c.exec('xfce4-terminal  -x bash -c "ssh 192.168.2.112; exec bash"')
}
