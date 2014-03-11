Ext.define('Webdesktop.store.duty.WorkManagerEvents', {
    extend: 'Extensible.calendar.data.EventStore',
    //model: 'Webdesktop.model.duty.WorkManager',
    alias : 'widget.workmanagerevents',

    autoLoad: true,
    proxy: {
        type: 'rest',
        url: CommonFunc.geturl()+'duty/getworkmanagerevents',
        noCache: false,
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
            type: 'json',
            nameProperty: 'mapping'
        },

        listeners: {
            exception: function(proxy, response, operation, options){
                var msg = response.message ? response.message : Ext.decode(response.responseText).message;
                // ideally an app would provide a less intrusive message display
                Ext.Msg.alert('Server Error', msg);
            }
        }
    },

    // It's easy to provide generic CRUD messaging without having to handle events on every individual view.
    // Note that while the store provides individual add, update and remove events, those fire BEFORE the
    // remote transaction returns from the server -- they only signify that records were added to the store,
    // NOT that your changes were actually persisted correctly in the back end. The 'write' event is the best
    // option for generically messaging after CRUD persistence has succeeded.
    listeners: {
        'write': function(store, operation){
            var title = Ext.value(operation.records[0].data[Extensible.calendar.data.EventMappings.Title.name], '(No title)');

            switch(operation.action){
                case 'create':
                    var win=Ext.widget('alertmsgwin',{title: '提醒',html:'新增成功'});
                    win.show();
                    win.getEl().slideIn('t',{ duration: 2000 });
                    win.getEl().slideOut('t', { duration: 2000 });
                    //win.destroy();
                    break;
                case 'update':
                    var win=Ext.widget('alertmsgwin',{title: '提醒',html:'保存成功'});
                    win.show();
                    win.getEl().slideIn('t',{ duration: 2000 });
                    win.getEl().slideOut('t', { duration: 2000 });
                    break;
                case 'destroy':
                    var win=Ext.widget('alertmsgwin',{title: '提醒',html:'删除成功'});
                    win.show();
                    win.getEl().slideIn('t',{ duration: 2000 });
                    win.getEl().slideOut('t', { duration: 2000 });
                    break;
            }
        }
    }

});