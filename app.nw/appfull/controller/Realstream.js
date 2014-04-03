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
          'realstream.RealStreamMapPanel',
          'realstream.RealStreamGrid'/*,
          'realstream.RealSeedChart'*/
    ],
    models: [
        'realstream.RealStream'
    ],
    stores: [
        'realstream.RealStreams'
    ],

    init: function() {
        this.control({
            'realseedchart': {
                afterrender: function () {
                    var me=this;
                    //var task = new Ext.util.DelayedTask(function(){
                        //me.getrealstreamdata();
                    //});
                    //task.delay(100);

                }
            },
            'realstreammappanel':{
                afterrender:function(){
                    var me=this;
                    var task = new Ext.util.DelayedTask(function(){
                        me.realstreammapInit();
                    });
                    task.delay(1000);

                },
                afterlayout:function( panel, layout, eOpts ){
                    if(this.map){
                        this.map.updateSize();
                    }
                }

            },
            'realstreamgrid':{
                afterrender:function(grid){
                    var store=grid.getStore();

                    var task={
                        run: function(){
                           store.load()
                        },
                        interval: 5000
                    }
                    Ext.TaskManager.start(task);
                }
            }

        });
    },
    realstreammapInit:function(){
        var me=this;
        var pixelProjection = new ol.proj.Projection({
            code: 'pixel',
            units: 'pixels',
            extent: [0, 0, 356,339]//1129, 1196
        });

        var features=[];
        for(var i=0;i<earth_quick_places.length;i++){
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(earth_quick_places[i].geom),//558, 825
                name: earth_quick_places[i].name
            });

            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    opacity: 0.75,
                    src: earth_quick_places[i].img
                }))
            });

            iconFeature.setStyle(iconStyle);
            features.push(iconFeature);


        }


        var vectorSource = new ol.source.Vector({
            features: features
        });

        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });

        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),

            undefinedHTML: '&nbsp;'
        });
        var map = new ol.Map({
            controls: ol.control.defaults().extend([mousePositionControl]),
            layers: [
                new ol.layer.Image({
                    source: new ol.source.ImageStatic({
                        attributions: [
                            new ol.Attribution({
                                //html: '&copy; <a href="http://xkcd.com/license.html">xkcd</a>'
                            })
                        ],
                        url: 'images/zjmap.jpg',
                        imageSize: [356,339],
                        projection: pixelProjection,
                        imageExtent: pixelProjection.getExtent()
                    })
                }),
                vectorLayer
            ],
            renderer: 'canvas',
            target: 'realstreammap',
            view: new ol.View2D({
                projection: pixelProjection,
                center: ol.extent.getCenter(pixelProjection.getExtent()),
                zoom: 1
            })
        });
        this.map=map;
        var element=document.getElementById('popup');
        /*var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');
        closer.onclick = function() {
            container.style.display = 'none';
            closer.blur();
            return false;
        };
*/
        var popup = new ol.Overlay({
            element: element,
            positioning: 'bottom-center',
            stopEvent: false
        });
        map.addOverlay(popup);

// display popup on click
        map.on('singleclick', function(evt) {
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function(feature, layer) {
                    return feature;
                });
            testobjs=feature;
            me.plot=null;
            if (feature) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                console.log(coord);
                popup.setPosition(coord);
                /*content.innerHTML = '<p>地震位置:</p><code>' + feature.get('name') +
                    '</code>';
                container.style.display = 'block';*/
               $(element).popover({
                    'placement': 'top',
                    'html': true,
                    'content': '<div style="width: 100%;" >地震来源:'+feature.get('name')+'<div id="realseedchart"  style="width: 350px;height: 100px;"></div>' +
                        '<div id="realseedchartbhe" style="width: 350px;height: 100px;"></div>'+
                        '<div id="realseedchartbhz" style="width: 350px;height: 100px;"></div>'+'</div>'
                });
                $(element).popover('show');
                me.getrelationdata(feature.get('name'));
                //me.getrealstreamdata();
            } else {
                $(element).popover('destroy');
            }
        });

// change mouse cursor when over marker
        $(map.getViewport()).on('mousemove', function(e) {
            var pixel = map.getEventPixel(e.originalEvent);
            var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
                return true;
            });
            if (hit) {
                //map.getTarget().style.cursor = 'pointer';
            } else {
                //map.getTarget().style.cursor = '';
            }
        });

    },

    getrelationdata:function(name){

        var me=this;
        var find_place=earth_quick_places[0];
        var params={
            rtime:find_place.relationstations[1].stime,
            stime:find_place.relationstations[1].stime,
            rstation:find_place.relationstations[1].stime,
            sstation:find_place.relationstations[1].stime
        };
        var successFunc = function (response, action) {
            var res = Ext.JSON.decode(response.responseText);
            console.log(res);
        };
        var failFunc = function (form, action) {
            //Ext.Msg.hide();
        };
        CommonFunc.ajaxSend(params,'realstream/realstreamrelations',successFunc,failFunc,'GET');


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
                if(!me.plot){
                    me.realstreamchart(bhe,bhn,bhz);
                }


            }else{
                Ext.Msg.alert("提示信息", "检查失败!");
            }


        };
        var failFunc = function (form, action) {
            //Ext.Msg.hide();


        };
        CommonFunc.ajaxSend(params,'readrealstreamfromcache',successFunc,failFunc,'GET');



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
