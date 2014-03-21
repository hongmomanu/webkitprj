Ext.define('Webdesktop.view.realstream.RealMiniSeedChart', {
    extend: 'Ext.chart.Chart',
    alias:'widget.realminiseedchart',
    layout: 'fit',
    requires: [
    ],

    initComponent: function() {
        var me = this;
        var bhe=[296,276,214,87,-19,-113,-235,-302,-347,-389,-350,-240,-122,-114,-84,64,149,225,323,381,384,363,341,296,288,324,349,327,290,253,220,223,256,315,363,407,439,474,503,474,446,424,395,378,345,290,213,135,87,69,119,192,275,384,352,256,179,85,107,147,225,350,423,512,533,544,567,566,585,615,694,743,752,675,519,418,366,398,539,695,777,804,789,683,563,512,486,463,462,464,448,420,398,384,367,402,501,612,698,733,711,673,689,749,811,854,839,749,646,556,483,405,311,279,237,212,230,191,159,162,157,109,121,212,299,416,494,501,513,567,664,742,780,817,803,747,682,593,493,383,311,268,210,142,85,48,45,85,111,128,149,122,54,-5,-48,-75,-39,13,37,86,140,172,155,118,71,-6,-54,-67,-51,-56,-38,-5,-40,-67,-113,-170,-217,-240,-217,-167,-92,-52,-53,-108,-220,-337,-391,-398,-407,-377,-389,-465,-522,-574,-618,-595,-516,-426,-377,-365,-340,-350,-392,-411,-422,-445,-496,-517,-503,-495,-436,-400,-452,-465,-452,-474,-504,-553,-637,-659,-585,-474,-383,-355,-358,-446,-523,-504,-469,-418,-374,-296,-269,-297,-235,-213,-259,-336,-491,-637,-746,-787,-744,-695,-649,-671,-751,-823,-885,-919,-881,-775,-645,-516,-433,-369,-334,-294,-272,-264,-214,-257,-258,-207,-213,-219,-286,-332,-370,-367,-245,-90,53,110,105,35,-76,-117,-108,-72,0,87,151,206,232,202,166,166,178,165,149,112,40,-40,-100,-138,-116,-39,-26,-50,-71,-200,-352,-463,-556,-521,-469,-376,-203,-89,58,145,138,115,54,20,29,121,250,323,329,273,166,1,-174,-286,-322,-296,-216,-74,74,103,138,226,246,349,472,523,529,437,343,244,223,277,342,431,424,398,365,317,319,327,327,305,296,300,298,310,381,445,420,375,313,222,121,8,-54,-36,3,9,14,8,11,88,225,374,458,518,551,549,562,553,591,630,606,628,676,706,706,667,625,614,653,658,582,479];
        var bhn=[-78,-1,16,10,-50,-177,-266,-286,-282,-314,-318,-239,-123,9,148,283,344,304,213,65,-91,-206,-286,-300,-230,-108,-25,9,37,57,65,73,92,102,145,157,68,37,63,18,-24,-10,-5,30,93,134,202,244,247,244,205,181,183,203,276,396,517,590,630,625,567,519,474,415,381,353,299,232,142,26,-56,-96,-99,-13,146,288,321,278,244,202,146,78,-7,-60,-61,-14,115,275,418,572,674,638,520,464,482,469,469,580,704,743,718,623,499,405,383,431,513,576,596,648,686,671,634,522,408,377,366,385,421,434,414,345,261,175,114,92,113,169,262,340,282,227,286,332,331,354,364,318,337,413,422,388,387,385,374,387,379,330,276,293,355,376,444,569,646,700,730,695,653,646,671,714,743,777,790,731,611,434,249,87,-7,30,125,226,357,433,378,309,261,172,120,91,57,58,67,100,151,205,266,304,298,275,282,262,251,331,456,529,540,521,419,288,162,51,-38,-97,-84,-20,59,80,79,47,45,126,184,229,232,226,230,226,230,194,140,67,-31,-102,-84,-20,24,63,55,-26,-121,-158,-148,-102,7,98,131,128,119,156,177,179,164,80,4,-41,-70,-115,-176,-230,-264,-245,-267,-253,-187,-162,-165,-295,-482,-636,-684,-589,-449,-302,-212,-191,-166,-123,-94,-70,-54,-26,24,10,-24,-41,-99,-183,-264,-276,-232,-206,-159,-127,-205,-335,-406,-452,-561,-655,-672,-712,-792,-876,-956,-1019,-1039,-931,-750,-570,-386,-258,-225,-213,-128,-106,-136,-102,-61,-25,-24,-60,-149,-261,-330,-367,-381,-404,-467,-557,-584,-550,-522,-464,-397,-379,-415,-489,-555,-555,-509,-506,-469,-344,-273,-235,-191,-210,-289,-383,-446,-523,-604,-610,-608,-651,-676,-604,-514,-449,-310,-174,-90,-29,-11,9,43,70,88,66,-1,-71,-119,-126,-98,-54,25,157,303,445,541,562,489,300,87,-95,-237,-282,-268,-250,-205,-151,-125,-127,-75,51,90,52,13,-50];
        var bhz=[460,490,473,387,250,81,-91,-226,-330,-385,-365,-262,-99,50,150,197,187,161,166,243,379,519,646,730,744,682,571,425,253,125,79,80,112,146,127,98,90,97,142,181,195,226,267,279,245,200,168,146,109,64,53,69,97,126,140,136,118,80,24,-36,-143,-260,-348,-424,-447,-406,-303,-175,-71,-4,-9,-52,-56,2,135,306,419,465,464,390,268,147,39,-48,-109,-124,-98,-85,-75,-64,-122,-244,-335,-384,-417,-414,-378,-304,-190,-70,-18,-35,-56,-74,-38,45,152,265,326,361,318,192,47,-104,-210,-256,-249,-214,-188,-184,-194,-225,-278,-347,-438,-534,-585,-579,-515,-403,-297,-231,-211,-213,-241,-267,-231,-175,-136,-132,-152,-176,-212,-237,-251,-266,-265,-235,-168,-60,79,204,272,257,182,103,21,-34,-51,-30,35,82,104,116,97,77,102,121,97,66,32,-12,-33,-24,-31,-43,-59,-111,-156,-168,-144,-94,-53,-40,-80,-129,-146,-195,-254,-256,-216,-145,-68,-8,17,6,4,-3,-26,-54,-74,-100,-151,-167,-152,-162,-158,-114,-72,-29,21,49,112,213,284,314,302,295,285,220,174,185,211,244,282,322,366,406,424,401,377,364,338,376,451,482,494,477,418,334,244,163,126,124,119,158,243,295,303,236,143,112,64,0,-25,5,75,164,306,448,550,594,562,461,309,189,141,175,245,309,362,338,235,85,-61,-135,-127,-37,115,299,434,479,502,511,503,465,374,291,245,214,225,275,308,331,297,198,104,51,68,107,112,72,-10,-93,-137,-163,-189,-204,-236,-249,-218,-165,-93,-24,59,181,325,418,459,523,581,657,725,709,623,476,337,212,113,43,-38,-94,-130,-100,0,127,237,293,302,263,256,289,348,448,516,540,524,469,385,265,159,103,90,84,66,54,52,68,137,235,293,315,320,311,289,245,179,85,37,23,15,70,155,248,337,396,425,452,502,530,560,597,597,585,551,493,426,363,280,152,32,-101];

        var jsonData = [

        ];

        var params={

        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            if(res.success){
                var bhn=[];
                var bhz=[];
                var bhe=[];
                var result=[];
                for(var i=0;i<res.result.length;i++){
                    Ext.each(res.result[i],function(item){
                        result.push(item);
                    });
                }
                for(var i=0;i<result.length;i++){
                   if(result[i].stationname.indexOf('BHZ')>0){
                       bhz=bhz.concat(result[i].data);

                   }else if(result[i].stationname.indexOf('BHE')>0){
                       bhe=bhe.concat(result[i].data);
                   }
                    else{
                       bhn=bhn.concat(result[i].data);
                   }
                }


                var task = { //定义一个任务
                    run: function(){
                        browserStore.add({
                            x:browserStore.getCount(),
                            bhn:bhn[browserStore.getCount()],
                            bhz:bhz[browserStore.getCount()],
                            bhe:bhe[browserStore.getCount()]
                        });
                    },
                    interval: 1000 //1 秒钟更新一次
                }
                Ext.TaskManager.start(task);//开始执行这个任务*/



                //Ext.TaskMgr.stop(task);//结束这个任务




            }else{
                Ext.Msg.alert("提示信息", "检查失败!");
            }


        };
        var failFunc = function (form, action) {
            //Ext.Msg.hide();


        };
        CommonFunc.ajaxSend(params,'readrealstreambyfilename',successFunc,failFunc,'GET');

        var fields = ['x', 'bhe', 'bhn', 'bhz'];

        var colors = ['rgb(47, 162, 223)',
            'rgb(60, 133, 46)',
            'rgb(234, 102, 17)',
            'rgb(154, 176, 213)',
            'rgb(186, 10, 25)',
            'rgb(40, 40, 40)'];

        Ext.chart.theme.Browser = Ext.extend(Ext.chart.theme.Base, {
            constructor: function(config) {
                Ext.chart.theme.Base.prototype.constructor.call(this, Ext.apply({
                    colors: colors
                }, config));
            }
        });



        //console.log(jsonData);
        var browserStore = Ext.create('Ext.data.JsonStore', {
            fields: fields,
            data: jsonData
        });
        Ext.apply(me, {
            animate: true,
            theme: 'Browser:gradients',
            defaultInsets: 30,
            store: browserStore,
            legend: {
                position: 'right'
            },
            //store: 'logmsg.LogSystemStatics',
           /* store:(function (me) {
                var s = Ext.widget('realminiseed');
                s.proxy.extraParams = {
                    type: me.searchtype,
                    bgday:me.bgday,
                    edday:me.edday
                }
                return s;
            })(this),*/
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: fields.slice(1),
                title: false,
                grid: true
            }, {
                type: 'Numeric',
                position: 'bottom',
                fields: ['x'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'x',
                minimum: 1,
                showMarkers: false,
                yField: fields[1]

            },{
                type: 'line',
                axis: 'left',
                xField: 'x',
                minimum: 1,
                showMarkers: false,
                yField: fields[2]

            },{
                type: 'line',
                showMarkers: false,
                axis: 'left',
                xField: 'x',
                minimum: 1,
                yField: fields[3]

            }]


        });
        me.callParent(arguments);
    }
});