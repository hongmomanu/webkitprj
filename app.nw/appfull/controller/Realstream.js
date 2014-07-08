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
                        //me.realstreammapInit();
                        me.realstreammapInitleaf();
                        me.websocketInit();
                    });
                    task.delay(1000);

                },
                afterlayout:function( panel, layout, eOpts ){
                    if(this.map){
                        this.map.invalidateSize(true);
                        //this.map.updateSize();
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
            var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: 'Map &copy;开源地图osm'

            });
            var baseLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr/{z}/{x}/{y}.png', {
                attribution: 'Map &copy; mapbox'

            });
            var  ter = L.tileLayer("http://t0.tianditu.cn/ter_w/wmts?" +
                "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
                minZoom: 4,
                maxZoom: 18
            });
            var baseMaps = {
                'OSM底图':osmLayer,
                "Mapbox": baseLayer,
                '天地图地形':ter
            };
            me.relationmap = new L.Map('relationmap', {center: [30.274089,120.15506900000003], zoom: 8, layers: [osmLayer]});
            var map=me.relationmap;
            var layersControl = new L.Control.Layers(baseMaps);
            map.addControl(layersControl);
            /*me.relationmap = L.map('relationmap').setView([30.274089,120.15506900000003], 11);
            var map=me.relationmap;
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
*/
            var popup = L.popup();

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent('当前的位置 ' + e.latlng.toString())
                    .openOn(map);
            }

            map.on('click', onMapClick);

            var NewControl = L.Control.extend({
                options: {
                    position: 'bottomleft'
                },

                onAdd: function (map) {
                    this._map = map;

                    var className = 'leaflet-hax',
                        container = L.DomUtil.create('div', className);
                    container.innerHTML = '<input class="span2" type="text" style="width: 120px;" id="quickpanto" value="30.274,120.155" />';


                    //if (!L.Browser.touch) {
                    //    alert('1');
                    L.DomEvent.disableClickPropagation(container);
                    //} else {
                    //    alert('2');
                    //    L.DomEvent.addListener(container, 'click', L.DomEvent.stopPropagation);
                    //}

                    return container;
                }
            });

            map.addControl(new NewControl());
            map.on('moveend', function(){
                var center = (map.getCenter());
                $('#quickpanto').val(center.lat.toFixed(3)+","+center.lng.toFixed(3));

            });

            $('#quickpanto').keyup(function(e){
                if(e.keyCode == 13)
                {
                    var lonlat=$('#quickpanto').val();
                    map.panTo([lonlat.split(",")[0],lonlat.split(",")[1]]);
                }
            });

        });
        d.delay(500);

    },
    websocketInit:function(){
        var url=localStorage.serverurl;
        //url=url?"ws://"+url.split("://")[1].split(":")[0]+":3001/":"ws://localhost:3001/";
        url=url.replace(/(:\d+)/g,":3001");
        url=url.replace("http","ws");
        var socket = new WebSocket(url);
        var me=this;
        socket.onmessage = function(event) {
            var data=event.data;
            data=JSON.parse(data);
            //console.log(data);
            if(data.type==="rts"){
                console.log(data);
                var results=data.results;
                var name=data.name;
                var new_results=[];
                if(me.eventid==data.eventid){

                    for(var t=0;t< data.results.lenght;t++){
                        var flag=true;
                          for(var tt=0;tt<me.eventresults;tt++){
                              if(me.eventresults[tt].sta_code==data.results[t].sta_code){
                                  flag=false;
                                  break;
                              }
                          }
                        if(flag){
                            new_results.push(data.results[t]);
                            me.eventresults.push(data.results[t]);
                        }
                    }
                    results=new_results;

                }else{
                    me.eventid=data.eventid;
                    me.eventresults=data.results;
                    me.showRelationMaplocation(data.lonlat);
                    $('#rts_chart').append('<a>发震时刻:</a>'+data.time);
                    $('#rts_chart').append('<br><a>计算相关性...</a>');
                    me.log_info="";
                    me.chart_caculate=0;
                }





                for(var i=0;i<name.length;i++){

                    for(var m=0;m<name[i].stations.length;m++){
                        //console.log(results[j].sta_code+"----"+name[i].stations[m].name);
                        var item=null;
                        for(var j=0;j<results.length;j++){

                            if(results[j].sta_code===name[i].stations[m].name){
                                item={
                                    rtime:results[j].time,
                                    stime:name[i].stations[m].stime,
                                    time:data.time,
                                    station:results[j].sta_code+"/"+results[j].chn_code,
                                    move:name[i].stations[m].move,
                                    name:name[i].name,
                                    second:name[i].stations[m].second
                                };
                            }

                        }
                        if(item){
                            me.chart_caculate++;
                            //console.log(me.chart_caculate);
                            me.relations_begin(name[i].name,item)
                        }

                    }

                }
                if(me.chart_caculate==0){
                    $('#rts_chart').append('<br><a>无相关对比测站</a>');
                    //$('#rts_chart').height(80);
                    /*var grid=Ext.getCmp('earthlistgrid');
                    var store=grid.getStore();
                    var data={
                        time:data.time
                    };
                    data['content']='<a>无相关对比测站</a>';
                    store.add(data);*/
                }

                var resoreceurl=localStorage.serverurl+"audio/rts.mp3";
                var play=new Audio(resoreceurl);
                play.play();

            }
            else if(data.type==="eqim"){
                var grid=Ext.getCmp('earthlistgrid');
                var store=grid.getStore();
                var str='<a>来源:'+ data['ip']+';&nbsp;&nbsp;发震时间:'+data['time']+'<br> 震级:M'+ (data['M']==null?"无":data['M'].toFixed(1))+', Ml'
                    +(data['Ml']==null?"无":data['Ml'].toFixed(1))+', Ms '+ (data['Ms']==null?"无":data['Ms'].toFixed(1))
                    +';<br> 地址:'+data['location']+'</a>';
                data['content']=str;

                store.add(data);

                var resoreceurl=localStorage.serverurl+"audio/eqim.mp3";
                var play=new Audio(resoreceurl);
                play.play();
            }
        }

    },

    relations_begin:function(title,params){

        var me=this;
        var successFunc = function (response, action) {

            var res=Ext.JSON.decode(response.responseText);
            //console.log(res)
            var relactions=[];
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
            me.log_info+="最大值:"+max_data+"<br>测站:"+params.station+
                "  （样本事件:"+title+")"+
                "<br>时间:"+params.rtime+"<br>";

            console.log(me.log_info);
            me.make_chart(params.rtime,params.second,
                params.station,max_index,title,null,params.stime,relactions,res.rate,params.time,me.log_info);


        };
        var failFunc = function (form, action) {
            //alert("fail");
            me.chart_caculate--;
        };

        var param={};
        for (var item in params){
            param[item]=params[item];
        }
        param.rstation=param.station;
        param.sstation=param.station;

        CommonFunc.ajaxSend(param,'realstream/rtsstreamrelations',successFunc,failFunc,'GET');


    },
    make_chart:function(time,second,station,max_index,chartname,callback,timesample,relactions,rate,htime,loginfo){
        var me=this;
        var params={};
        var ratereal=1000/Math.abs(rate);
        //time=time.replace("T"," ");

        var a= Ext.Date.add(new Date(time),Ext.Date.MILLI,max_index*Math.abs(rate));
        params.time=Ext.util.Format.date(a,'Y-m-d H:i:s.u');
        params.timesample=Ext.util.Format.date(timesample,'Y-m-d H:i:s.u');
        params.name=chartname;
        params.second=second;
        params.station=station;
        params.rate=ratereal;

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
            $('#rts_chart').append('<div id="'+id+'" style="height: 120px;"></div>');
            $('#rts_chart').append('<div id="'+idrelactions+'" style="height: 120px;"></div>');
            var plot = $.plot("#"+id, [
                { label:station, data: res, color: 'green' },
                { label:'样本数据：'+chartname+"-"+station, data: ressample, color: 'red' }
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
            me.chart_caculate--;
            if(me.chart_caculate==0){
                html2canvas($('#rts_chart'), {
                    //letterRendering:true,
                    //useOverflow:false,
                    onrendered: function (canvas) {
                        var img = canvas.toDataURL();
                        var system_cl=me.application.getController("Systemwatch");

                        system_cl.sendsystemlogs([{
                            statustype:realstreamtype.relation,
                            imgurl:img,
                            logcontent:me.log_info}],'duty/senddutylogs');


                        var grid=Ext.getCmp('earthlistgrid');
                        var store=grid.getStore();
                        var data={
                            stime:htime
                        };
                        data['content']=me.log_info===""?loginfo:me.log_info;

                        store.add(data);

                    }
                });

            }


        };
        var failFunc = function (form, action) {
            me.chart_caculate--;
        };
        CommonFunc.ajaxSend(params,'realstream/samplescachedetaillocal',successFunc,failFunc,'GET');


    },



    showRelationMaplocation:function(data){
        var me=this;
        me.relationmap.panTo(new L.LatLng(data[1],data[0]));
        if(me.popupmarker)me.relationmap.removeLayer(me.popupmarker);
        var marker=L.marker([data[1],data[0]]).addTo(me.relationmap)
            .bindPopup("<div id='rts_chart' style='width: 320px;height: 200px;overflow-y: auto;'></div>",{closeButton:true}).openPopup();
        me.popupmarker=marker;
        marker.on('popupclose', function(e) {
            //alert(1);
            try{
                me.relationmap.removeLayer(me.popupmarker);
            }catch(err) {

            }

        });

    },
    realmapfeaturesleaf:function(){
        var me=this;
        me.stationmvoe=0;
        var url=CommonFunc.geturl();
        var LeafIcon = L.Icon.extend({
            options: {
                shadowUrl:(url+Globle.shadow)/*,
                iconSize:     [38, 95],
                shadowSize:   [50, 64],
                iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor:  [-3, -76]*/
            }
        });
        var greenIcon = new LeafIcon({iconUrl: url+Globle.mapimg});
        var redIcon = new LeafIcon({iconUrl: url+Globle.mapalertimg});

        var store=Ext.StoreMgr.get('realstream.RealStreams');
        var taskfun=function(){
            store.load({
                params: {
                    timelong: localStorage.stationinterval
                },
                callback:function(s){
                //me.vectorLayer.getSource().clear();
                if(me.search_group)me.map.removeLayer(me.search_group);
                var features=[];
                var search_group = new L.LayerGroup();
                me.search_group=search_group;
                me.map.addLayer(search_group);
                //testobject=search_group;
                //testmap=me.map;
                for(var i=0;i< s.length;i++){
                    (function(i){
                        //var item=earth_quick_places[s[i].raw.stationcode];
                        var compare=s[i].raw.crossavgbhe==0?0:((s[i].raw.crossnowbhe-s[i].raw.crossavgbhe)/s[i].raw.crossavgbhe)*100;
                        //console.log(compare);
                        var crossnums=s[i].raw.crossnums;
                        var crossnowbhe=s[i].raw.crossnowbhe*60000/localStorage.stationinterval;
                        var crossavgbhe=s[i].raw.crossavgbhe*60000/localStorage.stationinterval;
                        var geom=eval(s[i].raw.geom);
                        var html='<ul><li><a>台站名:</a>'+s[i].raw.stationname
                            +'</li><li><a>波形偏差:</a>'+compare.toFixed(1)+" %"+'</li>' +
                            '</li><li><a>当前值:</a>'+crossnowbhe.toFixed(0)+'&nbsp;&nbsp;t/m<a>&nbsp;&nbsp;&nbsp;&nbsp;平均值:</a>'
                            +crossavgbhe.toFixed(0)+'&nbsp;&nbsp;t/m</li>' +
                            '<li><a>时间:</a>'+s[i].raw.time+'</li>'+
                            '<li><a>联系人:</a>'+s[i].raw.contact+'&nbsp;&nbsp;'+s[i].raw.phone+'</li>'+
                            '<li><a>数采地址:</a>'+s[i].raw.dataaddr+'</li>'+
                            '<li><a>网关地址:</a>'+s[i].raw.gatewayaddr+'</li>'+
                            '</ul><a class="btn" style="text-align: right;">检查故障</a>';
                        //console.log(geom);
                        L.marker(geom, {icon: ((Math.abs(compare)>localStorage.crossalert||crossnowbhe<crossnums)?redIcon:greenIcon)})
                            .bindPopup(html).addTo(search_group).on('popupopen',function(e){
                                $('a.btn').click(function(){
                                    var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"请等候..."});
                                    //myMask.show();
                                    var successFunc = function (response, action) {
                                        //myMask.hide();
                                        var res=Ext.JSON.decode(response.responseText);
                                        //console.log(res);

                                        var grid=Ext.getCmp('earthlistgrid');
                                        var store=grid.getStore();
                                        var str='<a>台站:'+s[i].raw.stationname+'&nbsp;&nbsp;数采:'
                                            +(res.dataping?'正常':'超时')
                                            +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
                                            '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网关:'
                                            +(res.gateway?'正常':'超时')+'<br>';
                                        console.log(s[i].raw.stationname);
                                        console.log(str);
                                        if(res.results.length>0){
                                            for(var j=0;j<res.results.length;j++){
                                                str+='告警&nbsp;'+Ext.util.Format.date(new Date(res.results[j].sdate),'Y-m-d H:i:s');
                                                str+='&nbsp;&nbsp;'+ res.results[j].alarmname+'<br>';
                                            }
                                        }else{
                                            str+='无故障信息';
                                        }

                                        str+='</a>';
                                        var data={
                                            stime:Ext.util.Format.date(new Date(),'Y-m-d')+'<br>'+Ext.util.Format.date(new Date(),'H:i:s')
                                        };
                                        data['content']=str;
                                        store.add(data);
                                        var system_cl=me.application.getController("Systemwatch");
                                        system_cl.sendsystemlogs([{
                                            statustype:exceptiontype.stationcheck,
                                            logcontent:str}],'duty/senddutylogs');


                                    };
                                    var failFunc = function (form, action) {
                                        //alert("fail");
                                        //myMask.hide();
                                    };
                                    var etime=new Date();
                                    etime=Ext.Date.add(etime,Ext.Date.DAY,1);
                                    var btime=Ext.Date.add(etime,Ext.Date.DAY,-3);

                                    var param={
                                        stationname:s[i].raw.stationname,
                                        etime:Ext.util.Format.date(etime,'Y-m-d'),

                                        btime:Ext.util.Format.date(btime,'Y-m-d')
                                    };
                                    if(s[i].raw.dataaddr&&s[i].raw.dataaddr!='')param.dataaddr=s[i].raw.dataaddr;
                                    if(s[i].raw.gatewayaddr&&s[i].raw.gatewayaddr!='')param.gatewayaddr=s[i].raw.gatewayaddr;

                                    CommonFunc.ajaxSend(param,'realstream/stationcheck',successFunc,failFunc,'get');


                                });

                            });

                    })(i);


                }
                //me.vectorLayer.getSource().addFeatures(features);

            }})
        };
        //taskfun();
        var task={
            run:taskfun ,
            interval: 30000
        }
        Ext.TaskManager.start(task);

    },
    realmapfeatures:function(){
        var me=this;
        me.stationmvoe=0;
        var store=Ext.StoreMgr.get('realstream.RealStreams');
        var taskfun=function(){
            store.load({callback:function(s){
                me.vectorLayer.getSource().clear();
                var features=[];
                for(var i=0;i< s.length;i++){
                    (function(i){
                        //var item=earth_quick_places[s[i].raw.stationcode];
                        var compare=s[i].raw.crossnowbhe==0?0:((s[i].raw.crossavgbhe-s[i].raw.crossnowbhe)/s[i].raw.crossnowbhe)*100;
                        //console.log(compare);
                        var geom=eval(s[i].raw.geom);
                        //console.log(geom);
                        var iconFeature = new ol.Feature({
                            geometry: new ol.geom.Point(geom),//558, 825
                            name: s[i].raw.stationname,
                            time:s[i].raw.time,
                            stationid:s[i].raw.stationid,
                            cross:compare
                        });


                        var url=CommonFunc.geturl();
                        var iconStyle = new ol.style.Style({
                            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                                anchor: [0.5, 46],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                opacity: 0.75,
                                src:Math.abs(compare)>15?(url+Globle.mapalertimg):(url+Globle.mapimg)
                            }))
                        });

                        iconFeature.setStyle(iconStyle);
                        iconFeature.on('change',function(de){
                            testobj=de;
                            me.stationmvoe++;
                            var task = (function(index){

                                return new Ext.util.DelayedTask(function(){
                                    if(index===me.stationmvoe){
                                         var item=de.c.e;
                                         var extent=item.geometry.extent;
                                         var stationid=item.stationid;

                                         var successFunc = function (response, action) {

                                         var res=Ext.JSON.decode(response.responseText);

                                         };
                                         var failFunc = function (form, action) {
                                         //alert("fail");

                                         };

                                         var param={
                                         geom:"["+extent[0]+","+extent[1]+"]",
                                         id:stationid
                                         };

                                         CommonFunc.ajaxSend(param,'duty/savestation',successFunc,failFunc,'post');


                                    }

                                });

                            })(me.stationmvoe);
                            task.delay(1000);

                        });
                        features.push(iconFeature);

                    })(i);


                }
                me.vectorLayer.getSource().addFeatures(features);

            }})
        };
        //taskfun();
        var task={
            run:taskfun ,
            interval: 30000
        }
        Ext.TaskManager.start(task);

    },

    realstreammapInitleaf:function(){
        /*var me=this;
        var url=CommonFunc.geturl();
        me.map=L.map('realstreammap',{maxZoom: 11}).setView([52.295, 1.2], 11);
        var imageUrl = url+'images/zjmap.gif',
            imageBounds = [[52, 1], [52.416, 1.483]];

        L.imageOverlay(imageUrl, imageBounds).addTo(me.map);
        me.map.setMaxBounds(imageBounds);*/
        var me=this;
        var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'Map &copy;开源地图osm'

        });
        var baseLayer = L.tileLayer('http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr/{z}/{x}/{y}.png', {
            attribution: 'Map &copy;mapbox'

        });
        var  ter = L.tileLayer("http://t0.tianditu.cn/ter_w/wmts?" +
            "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
            "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}", {
            minZoom: 4,
            maxZoom: 18
        });
        var baseMaps = {
            'OSM底图':osmLayer,
            "Mapbox": baseLayer,
            '天地图地形':ter
        };
        me.map = new L.Map('realstreammap', {center: [30.274089,120.15506900000003], zoom: 8, layers: [osmLayer]});
        var map=me.map;
        /*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);*/
        var layersControl = new L.Control.Layers(baseMaps);
        map.addControl(layersControl);
        me.realmapfeaturesleaf();





    },
    realstreammapInit:function(){
        var me=this;
        var url=CommonFunc.geturl();
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

        var overlayStyle = (function() {
            /* jshint -W069 */
            var styles = {};
            styles['Polygon'] = [
                new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: [255, 255, 255, 0.5]
                    })
                }),
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [255, 255, 255, 1],
                        width: 5
                    })
                }),
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [0, 153, 255, 1],
                        width: 3
                    })
                })
            ];
            styles['MultiPolygon'] = styles['Polygon'];

            styles['LineString'] = [
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [255, 255, 255, 1],
                        width: 5
                    })
                }),
                new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: [0, 153, 255, 1],
                        width: 3
                    })
                })
            ];
            styles['MultiLineString'] = styles['LineString'];

            styles['Point'] = [
                new ol.style.Style({
                    image: new ol.style.Circle({
                        radius: 7,
                        fill: new ol.style.Fill({
                            color: [0, 153, 255, 1]
                        }),
                        stroke: new ol.style.Stroke({
                            color: [255, 255, 255, 0.75],
                            width: 1.5
                        })
                    }),
                    zIndex: 100000
                })
            ];
            styles['MultiPoint'] = styles['Point'];

            styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

            return function(feature, resolution) {
                return styles[feature.getGeometry().getType()];
            };
            /* jshint +W069 */
        })();

        var select = new ol.interaction.Select({
            style: overlayStyle
        });
        var modify = new ol.interaction.Modify({
            features: select.getFeatures(),
            style: overlayStyle
        });

       /* modify.on('moveend',function(fe){
                alert(1);
                console.log(fe);
            });*/
       // modify.dispatchChangeEvent();


        var mousePositionControl = new ol.control.MousePosition({
            coordinateFormat: ol.coordinate.createStringXY(4),

            undefinedHTML: '&nbsp;'
        });


        var map = new ol.Map({
            interactions: Globle.isadmin?ol.interaction.defaults().extend([select, modify]):ol.interaction.defaults().extend([]),
            controls: ol.control.defaults().extend([mousePositionControl]),
            layers: [
                new ol.layer.Image({
                    source: new ol.source.ImageStatic({
                        attributions: [
                            new ol.Attribution({
                                //html: '&copy; <a href="http://xkcd.com/license.html">xkcd</a>'
                            })
                        ],
                        url: url+'images/zjmap.gif',
                        imageSize: [483,416],
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
                //console.log(feature);
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
                    'content': '<div style="width: 100%;"><div id="realseedchart" style="width: 200px;height: 100px;"></div></div>'
                });
                $(element).popover('show');
                $('#realseedchart').append('<ul><li><a>测站名:</a>'+feature.get('name')
                    +'</li><li><a>波形偏差:</a>'+feature.get('cross').toFixed(2)+" %"+'</li>' +
                    '<li><a>时间:</a>'+feature.get('time')+'</li>'+
                    '</ul>') ;

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
