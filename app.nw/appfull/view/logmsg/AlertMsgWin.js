/**
 * Created by jack on 14-2-18.
 */

Ext.define('Webdesktop.view.logmsg.AlertMsgWin' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.alertmsgwin',
    requires: [
    ],
    initComponent: function() {
        Ext.apply(this, {
            iconCls: this.iconCls || 'information',
            width: 250,
            height: 150,
            autoScroll: true,
            autoDestroy: true,
            plain: false,
            shadow:false
        });
        this.task = new Ext.util.DelayedTask(this.hide, this);
        this.superclass.initComponent.call(this);
        this.callParent(arguments);
    },
    setMessage: function(msg){
        this.body.update(msg);
    },
    setTitle: function(title, iconCls){
        this.superclass.setTitle.call(this, title, iconCls||this.iconCls);
    },
    onRender:function(ct, position) {
        this.superclass.onRender.call(this, ct, position);
    },
    onDestroy: function(){
        this.positions.remove(this.pos);
        this.superclass.onDestroy.call(this);
    },
    afterShow: function(){
        this.superclass.afterShow.call(this);
        this.on('move', function(){
                this.positions.remove(this.pos);
                this.task.cancel();}
            , this);
        this.task.delay(4000);
    },
    animShow: function(){
        this.pos = 0;
        while(this.positions.indexOf(this.pos)>-1)
            this.pos++;
        this.positions.push(this.pos);
        this.setSize(250,150);
        this.el.alignTo(document, "br-br", [ -20, -20-((this.getSize().height+10)*this.pos) ]);
        this.el.slideIn('b', {
            duration: 2,
            callback: this.afterShow,
            scope: this
        });
    },
    animHide: function(){
        this.positions.remove(this.pos);
        this.el.ghost("b", {
            duration: 2,
            remove: true,
            scope: this,
            callback: this.destroy
        });
    }


});