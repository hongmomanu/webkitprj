/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Realstream', {
    extend: 'Ext.app.Controller',
    views: [
          'realstream.RealMiniSeedChart',
          'realstream.RealSeedChart'
    ],
    models: [

    ],
    stores: [

    ],

    init: function() {
        this.control({
            'realseedchart': {
                afterrender: function () {
                    var me=this;
                    //var task = new Ext.util.DelayedTask(function(){
                        me.getrealstreamdata();
                    //});
                    //task.delay(100);

                }
            }

        });
    },

    getrealstreamdata:function(){
        var me=this;
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
                me.realstreamchart(bhe,bhn,bhz);

            }else{
                Ext.Msg.alert("提示信息", "检查失败!");
            }


        };
        var failFunc = function (form, action) {
            //Ext.Msg.hide();


        };
        CommonFunc.ajaxSend(params,'readrealstreambyfilename',successFunc,failFunc,'GET');



    },
    realstreamchart:function(bhe,bhn,bhz){

        var data = [],
            totalPoints = 6000;




        function getRandomData(data) {

            /*if (data.length > 0)
                data = data.slice(1);

            // Do a random walk

            while (data.length < totalPoints) {

                *//*var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < -100) {
                    y = -100;
                } else if (y > 100) {
                    y = 100;
                }*//*

                //data.push(y);
            }*/

            // Zip the generated y values with the x values

            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }

            return res;
        }

        // Set up the control widget

        var updateInterval = 30;


        var plot = $.plot("#realseedchart", [ { label: "BHN", data: getRandomData(bhn),color: '#ED561B' } ], {
            series: {
                shadowSize: 0	// Drawing is faster without shadows
            },
            yaxis: {
            },
            xaxis: {
                show: false
            }
        });
        var plotbhe = $.plot("#realseedchartbhe", [{ label: "BHE", data: getRandomData(bhe), color: 'green' } ], {
            series: {
                shadowSize: 0	// Drawing is faster without shadows
            },
            yaxis: {
            },
            xaxis: {
                show: false
            }
        });
        var plotbhz = $.plot("#realseedchartbhz", [ { label: "BHZ", data: getRandomData(bhz),color: '#058DC7' }  ], {
            series: {
                shadowSize: 0	// Drawing is faster without shadows
            },
            yaxis: {
            },
            xaxis: {
                show: false
            }
        });

        /*function update() {

            plot.setData([getRandomData(bhn)]);
            plotbhe.setData([getRandomData(bhe)]);
            plotbhz.setData([getRandomData(bhz)]);

            // Since the axes don't change, we don't need to call plot.setupGrid()

            plot.draw();
            plotbhe.draw();
            plotbhz.draw();
            setTimeout(update, updateInterval);
        }

        update();*/
        this.plot=plot;
        this.plotbhe=plotbhe;
        this.plotbhz=plotbhz;
    }


});
