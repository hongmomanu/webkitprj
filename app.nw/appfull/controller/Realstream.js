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
          'realstream.RealStreamRelationMapPanel',
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
            'realstreamrelationmappanel':{
              afterrender:this.initrelationmap ,
              afterlayout:function( panel, layout, eOpts ){
                    if(this.relationmap){
                        this.relationmap.invalidateSize(true);
                    }
               }

            },
            'realstreammappanel':{
                afterrender:function(){
                    var me=this;
                    var task = new Ext.util.DelayedTask(function(){
                        me.realstreammapInit();
                        me.websocketInit();
                    });
                    task.delay(1000);

                },
                afterlayout:function( panel, layout, eOpts ){
                    if(this.map){
                        this.map.updateSize();
                    }
                }

            }/*,
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
            }*/

        });
    },
    initrelationmap:function(){
        var me=this;
        var d = new Ext.util.DelayedTask(function(){
            //console.log($('#map').height());
            //console.log($('#map').width());
            me.relationmap = L.map('relationmap').setView([30.274089,120.15506900000003], 11);
            var map=me.relationmap;
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            var popup = L.popup();

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("当前的位置 " + e.latlng.toString())
                    .openOn(map);
            }

            map.on('click', onMapClick);

        });
        d.delay(500);

    },
    websocketInit:function(){
        var url=localStorage.serverurl;
        url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        var socket = new WebSocket(url);
        var me=this;
        socket.onmessage = function(event) {
            var data=event.data;
            data=JSON.parse(data);
            if(data.type==="rts"){
                console.log(data);
                var results=data.results;
                var name=data.name;

                for(var j=0;j<results.length;j++){

                    for(var i=0;i<name.length;i++){
                        var item=null;
                         for(var m=0;m<name[i].stations.length;m++){
                              console.log(results[j].sta_code+"----"+name[i].stations[m].name);
                              if(results[j].sta_code===name[i].stations[m].name){
                                  item={
                                      rtime:results[j].time,
                                      stime:name[i].stations[m].stime,
                                      station:results[j].sta_code+"/"+results[j].chn_code,
                                      move:name[i].stations[m].move,
                                      name:name[i].name,
                                      second:name[i].stations[m].second
                                  };
                              }
                         }
                        if(item){
                            me.relations_begin(name[i].name,item)
                        }

                    }

                }

                me.showRelationMaplocation(data.lonlat);
                var resoreceurl=localStorage.serverurl+"audio/rts.mp3";
                var play=new Audio(resoreceurl);
                play.play();

            }
        }

    },

    relations_begin:function(title,params){

        var me=this;
        var successFunc = function (response, action) {

            var res=Ext.JSON.decode(response.responseText);
            console.log(res)
            /*var relactions=[];
            var rtime=res.rtime;
            var stime=res.stime;

            Ext.each(res.relations,function(item){
                relactions.push(item.toFixed(2));
            });
            var max_index=0;
            var max_data=0;


            for(var i=0;i<relactions.length;i++){
                var item_data=Math.abs(relactions[i]);
                if(item_data>max_data){
                    max_data=item_data;
                    max_index=i;
                }
            }

            //me.appedtext("最大值:"+max_data,resultpanel,true);
            //me.appedtext("\n",resultpanel,true);

            //rtime= Ext.Date.add(new Date(rtime),Ext.Date.HOUR,8);
            //stime= Ext.Date.add(new Date(stime),Ext.Date.HOUR,8);
            params.rtime=rtime;
            params.stime=stime;
            me.make_chart(params.rtime,params.second,
                params.station,max_index,title,null,params.stime,relactions,res.rate);
*/


        };
        var failFunc = function (form, action) {

        };

        var param={};
        for (var item in params){
            param[item]=params[item];
        }
        param.rstation=param.station;
        param.sstation=param.station;

        CommonFunc.ajaxSend(param,'realstream/rtsstreamrelations',successFunc,failFunc,'GET');


    },
    make_chart:function(time,second,station,max_index,chartname,callback,timesample,relactions,rate){
        var me=this;
        var params={};
        //time=time.replace("T"," ");

        var a= Ext.Date.add(new Date(time),Ext.Date.MILLI,max_index*Math.abs(rate));
        params.time=Ext.util.Format.date(a,'Y-m-d H:i:s.u');
        arams.timesample=Ext.util.Format.date(timesample,'Y-m-d H:i:s.u');

        params.second=second;
        params.type=type;
        params.station=station;

        var successFunc = function (response, action) {
            var data=Ext.JSON.decode(response.responseText).result;
            var datasample=Ext.JSON.decode(response.responseText).result1;
            var maxdata=Ext.max(Ext.Array.map(data,function(item){
                return Math.abs(item);
            }));
            var maxsampledata=Ext.max(Ext.Array.map(datasample,function(item){
                return Math.abs(item);
            }));

            var res = [];
            var ressample=[];
            var resrelactions=[];


            for (var i = 0; i < data.length; i++) {
                res.push([i, data[i]/maxdata]);
                ressample.push([i,datasample[i]/maxsampledata]);
            }
            for(var i=0;i<relactions.length;i++){
                resrelactions.push([i,relactions[i]]);

            }

            var id=chartname+"chart"+station.replace("/","-");
            var idrelactions=id+"relactions";
            $('#chart_div').append('<div id="'+id+'" style="height: 120px;"></div>');
            $('#chart_div').append('<div id="'+idrelactions+'" style="height: 120px;"></div>');
            var plot = $.plot("#"+id, [
                { label:chartname+station, data: res, color: 'green' },
                { label:'样本数据：'+station, data: ressample, color: 'red' }
            ], {
                series: {
                    shadowSize: 0
                },
                yaxis: {
                },
                xaxis: {
                    show: false
                }
            });
            var plot_relation = $.plot("#"+idrelactions, [
                { label:'滑动相关性：'+station, data: resrelactions, color: 'blue' }
            ], {
                series: {
                    shadowSize: 0
                },
                yaxis: {
                },
                xaxis: {
                    show: true
                }
            });
            if(callback)callback();


        };
        var failFunc = function (form, action) {

        };
        CommonFunc.ajaxSend(params,'realstream/samplescachedetail',successFunc,failFunc,'GET');


    },



    showRelationMaplocation:function(data){
        this.relationmap.panTo(new L.LatLng(data[1],data[0]));
        if(this.popupmarker)this.relationmap.removeLayer(this.popupmarker);
        var marker=L.marker([data[1],data[0]]).addTo(this.relationmap)
            .bindPopup("<div>定位成功</div>").openPopup();
        this.popupmarker=marker;

    },
    realmapfeatures:function(){
        var me=this;
        var store=Ext.StoreMgr.get('realstream.RealStreams');
        var taskfun=function(){
            store.load({callback:function(s){
                me.vectorLayer.getSource().clear();
                var features=[];
                for(var i=0;i< s.length;i++){
                    var item=earth_quick_places[s[i].raw.stationcode];
                    var compare=s[i].raw.crossnowbhe==0?0:((s[i].raw.crossavgbhe-s[i].raw.crossnowbhe)/s[i].raw.crossnowbhe)*100;
                    //console.log(compare);
                    var iconFeature = new ol.Feature({
                        geometry: new ol.geom.Point(item.geom),//558, 825
                        name: s[i].raw.stationname,
                        time:s[i].raw.time,
                        cross:compare
                    });

                    var iconStyle = new ol.style.Style({
                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                            anchor: [0.5, 46],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            opacity: 0.75,
                            src:Math.abs(compare)>15?item.alertimg:item.img
                        }))
                    });

                    iconFeature.setStyle(iconStyle);
                    features.push(iconFeature);

                }
                me.vectorLayer.getSource().addFeatures(features);

            }})
        };
        taskfun();
        var task={
            run:taskfun ,
            interval: 5000
        }
        Ext.TaskManager.start(task);

    },
    realstreammapInit:function(){
        var me=this;
        var pixelProjection = new ol.proj.Projection({
            code: 'pixel',
            units: 'pixels',
            extent: [0, 0, 356,339]//1129, 1196
        });



       /* var vectorSource = new ol.source.Vector({
            features: features
        });*/

        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                projection: pixelProjection
            })
        });
        this.vectorLayer=vectorLayer;
        this.realmapfeatures();

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
        testobj=map;
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
                //console.log(coord);
                popup.setPosition(coord);
                /*content.innerHTML = '<p>地震位置:</p><code>' + feature.get('name') +
                    '</code>';
                container.style.display = 'block';*/
               $(element).popover({
                    'placement': 'top',
                    'html': true,

                    'content': '<div style="width: 100%;">测站名:'+feature.get('name')+'<div id="realseedchart"  style="width: 200px;height: 100px;"></div>' +
                        /*'<div id="realseedchartbhe" style="width: 200px;height: 0px;"></div>'+
                        '<div id="realseedchartbhz" style="width: 200px;height: 0px;"></div>'+*/
                        '</div>'
                });
                $(element).popover('show');
                $('#realseedchart').append('<a>波形偏差:</a>'+feature.get('cross').toFixed(2)+" %") ;
                /*var task={
                    run: function(){
                        $('#waitinfo').append('.') ;
                    },
                    interval: 500
                }
                Ext.TaskManager.start(task);
                me.getrelationdata(feature.get('name'),task);*/
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

    getrelationdata:function(name,task){

        var me=this;
        var find_place=CommonFunc.finditembyprop(earth_quick_places,"name",name);
        Ext.each(find_place.relationstations,function(a){
            var params={
                rtime:a.rtime,
                stime:a.stime,
                rstation:a.name,
                sstation:a.name ,
                second: a.second
            };
            var successFunc = function (response, action) {
                Ext.TaskManager.stop(task);
                $('#waitinfo').html('');
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res);
                $('#realseedchart').append('<p>'+res.sstation+':'+Ext.max(res.relations)+'</p>');

            };
            var failFunc = function (form, action) {
                Ext.TaskManager.stop(task);
                //Ext.Msg.hide();
            };
            CommonFunc.ajaxSend(params,'realstream/realstreamrelations',successFunc,failFunc,'GET');

        })


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
