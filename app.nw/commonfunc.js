/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
var CommonFunc = {

//form提交共用方法
    formSubmit: function (myform, params, url, sucFunc, failFunc, waitmsg) {
        var form = myform.getForm();
        var me = this;
        if (form.isValid()) {
            //Ext.MessageBox.alert('Submitted Values', form.getValues(true));
            form.submit({
                waitTitle: '提示', //标题
                waitMsg: waitmsg, //提示信息
                url: me.geturl() + url,

                method: "POST",
                params: params,
                success: sucFunc,
                failure: failFunc
            });

        } else {
            var invaliditem = form.getFields().findBy(function (c) {
                if (!c.isValid()) {
                    return c
                }
            });
            var formcontent = myform.getDefaultContentTarget();
            var target = invaliditem.getEl();
            target.scrollIntoView(formcontent, true, true, true);
        }


    },
    ajaxSend: function (params, url, sucFun, failFunc, method) {
        var me = this;
        Ext.Ajax.request({
            url: me.geturl() + url,
            method: method,

            params: params,
            success: sucFun,
            failure: failFunc
        });

    },

    geturl: function () {
        var url = Globle.iswebapp ? "" : localStorage.serverurl;
        return url;

    },
    finditembyprop:function(items,pname,pvalue){
         for(var i=0;i<items.length;i++){
             if(items[i][pname]==pvalue){
                 return items[i];
                 break;
             }
         }
    },
    makeanim:function(targetWin){
        Ext.create('Ext.fx.Anim', {
            target: targetWin,
            duration: 1000,
            from: {
                width: 400, //starting width 400
                opacity: 0,       // Transparent
                color: '#ffffff', // White
                left: 0
            },
            to: {
                width: 300, //end width 300
                height: 300 // end height 300
            }
        });
    },
    maxpanel: function (widgetname, title, target) {
        var a=Ext.widget('animatedwindow',{

            animateTarget: target,
            maximized: true,
            closable: true,
            closeAction:'hide',
            baseCls: "x-panel",
            layout:'fit',
            listeners: {
                beforeclose:function(){
                    var panel=target.up('panel');
                    panel.add(widgetname);

                }

            },
            //modal:true,
            title: title,
            items: [
                widgetname

            ]
        });

        a.show();
    }


}