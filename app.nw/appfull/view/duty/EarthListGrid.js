Ext.define('Webdesktop.view.duty.EarthListGrid', {
    extend: 'Ext.grid.Panel',
    alias:'widget.earthlistgrid',
    layout: 'fit',
    requires: [
    ],

    initComponent: function() {
        var me = this;
        //alert(1);
        Ext.apply(me, {
            //title: '数据相关测试',
            border: false,
            hideHeaders:false,
            multiSelect: true,
            viewConfig: {
                trackOver: true,
                loadMask: true,
                scrollToTop: Ext.emptyFn,
                enableTextSelection:true
            },

            columns: [
                {header:'来源',dataIndex:"ip"},
                {header:'时间',dataIndex:"time"},
                {header:'震级',dataIndex:"time",renderer : function(v,m,r) {
                    var str='<a>M'+ (r.get('M')==null?"无":r.get('M'))+', Ml'
                        +(r.get('Ml')==null?"无":r.get('Ml'))+', Ms '+ (r.get('Ms')==null?"无":r.get('Ms'))+
                        '</a>';
                    return str;
                }},

                {header: '地址',dataIndex: 'location',flex: 1}
            ],

            store: Ext.create('Ext.data.Store', {
                //alias: 'store.ModeStore',
                autoLoad: false,
                fields: [
                    {name: 'ip',
                        type: 'string'},
                    {name: 'location',
                        type: 'string'},
                    {name:'lat',
                        type: 'float'},
                    {name:'lon',
                        type: 'float'},
                    {name:'depth',
                        type: 'string'},
                    {name:'eqtype',
                        type: 'string'},
                    {name:'M',
                        type: 'string'},
                    {name:'Ml',
                        type: 'string'},
                    {name:'Ms',
                        type: 'string'},
                    {name:'cname',
                        type: 'string'},
                    {name:'sname',
                        type: 'string'},
                    {name:'time',
                        type: 'string'},
                    {name:'type',
                        type: 'string'}
                ],
                data: [
                    /*{
                    location :"杭州",
                    lat :30.294,
                    lon:120.158,
                    depth:"10km",
                    Ml:"ML",
                    M:'M',
                    Ms:'Ms',
                    time:'2014-12-20 14:00:22',
                    infotype:'CC'
                }*/

                ]
                , sorters: { property: 'time', direction : 'DESC' }
            })

        });
        me.callParent(arguments);
    }
});