/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-8-22
 * Time: 下午5:58
 * To change this template use File | Settings | File Templates.
 */
var CommonFunc = {

//form提交共用方法
    formSubmit: function (myform, params, url, sucFunc, failFunc,waitmsg) {
        var form = myform.getForm();
        var me=this;
        if (form.isValid()) {
            //Ext.MessageBox.alert('Submitted Values', form.getValues(true));
            form.submit({
                waitTitle: '提示', //标题
                waitMsg: waitmsg, //提示信息
                url: me.geturl()+url,

                method: "POST",
                params: params,
                success: sucFunc,
                failure: failFunc
            });

        }else{
            var invaliditem=form.getFields().findBy(function(c){if(!c.isValid()){return c}});
            var formcontent=myform.getDefaultContentTarget();
            var target=invaliditem.getEl();
            target.scrollIntoView(formcontent,true,true,true);
        }


    },
    ajaxSend:function(params,url,sucFun,failFunc,method){
        var me=this;
        Ext.Ajax.request({
            url: me.geturl()+url,
            method : method,
            params: params,
            success:sucFun,
            failure:failFunc
        });

    },

    geturl:function(){
        var url=Globle.iswebapp?"":localStorage.serverurl;
        return url;

    }


}