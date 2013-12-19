/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Webdesktop.App', {
    extend: 'Ext.ux.desktop.App',
    alias:'widget.maindesktopview',

    requires: [

    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
            new Webdesktop.VideoWindow(),
            //new Webdesktop.Blockalanche(),
            new Webdesktop.SystemStatus(),
            new Webdesktop.GridWindow(),
            new Webdesktop.TabWindow(),
            new Webdesktop.AccordionWindow(),
            new Webdesktop.Notepad(),
            new Webdesktop.BogusMenuModule(),
            new Webdesktop.BogusModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    { name: '测试窗口', iconCls: 'grid-shortcut', module: 'grid-win' },
                    /*{ name: 'Accordion Window', iconCls: 'accordion-shortcut', module: 'acc-win' },*/
                    { name: '记事本', iconCls: 'notepad-shortcut', module: 'notepad' },
                    { name: '系统状态', iconCls: 'cpu-shortcut', module: 'systemstatus'}
                ]
            }),

            wallpaper: 'wallpapers/sky.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'设置',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'注销',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    },'-',
                    {
                        text:'锁屏',
                        iconCls:'logout',
                        handler: me.onLockwin,
                        scope: me
                    }
                ]
            }
        });
    },
    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },
    onLockwin:function(){
        Ext.widget('webdesktop_lockwin');

    },
    onLogout: function () {
        Ext.Msg.confirm('注销', '您确定要注销么?',
            function(btn) {
                if (btn === 'yes') {
                    var splashscreen = new Ext.LoadMask(Ext.getBody().el, {msg:"注意,系统注销中..."});
                    splashscreen.show();
                    window.location.reload();

                } else {

                }
            });

    },

    onSettings: function () {
        var dlg = new Webdesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
