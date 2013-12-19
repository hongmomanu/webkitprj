/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:33
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Webdesktop.view.TestGrid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.testgrid',

    title: 'All Users',

    initComponent: function() {
        Ext.apply(this, {
            title: '新增用户',
            height: 400,
            width: 430,
            closeAction : 'hide',
            resizable:false,
            tbar:[{
                text:'Add Something',
                tooltip:'Add a new row',
                action:'add',
                iconCls:'add'
            }],
            store: {
                fields: ['name', 'email'],
                data  : [
                    {name: 'Ed',    email: 'ed@sencha.com'},
                    {name: 'Tommy', email: 'tommy@sencha.com'}
                ]
            },
            columns:[
                {header: 'Name',  dataIndex: 'name',  flex: 1},
                {header: 'Email', dataIndex: 'email', flex: 1}
            ],
            layout: 'fit'
        })

        this.callParent(arguments);
    }
});