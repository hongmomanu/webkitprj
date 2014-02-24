/**
 * Created with IntelliJ IDEA.
 * User: jack
 * Date: 13-12-17
 * Time: 下午3:05
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Webdesktop.controller.Systemwatch', {
    extend: 'Ext.app.Controller',
    views: [
         'systemwatch.Systempanel'
    ],
    models: [

    ],
    stores: [

    ],

    init: function() {


        this.control({


            'systempanel':{
                afterrender:function(){
                    if (window.goSamples) goSamples();
                    var $ = go.GraphObject.make;
                    //myDiagram.redraw();
                    myDiagram =
                        $(go.Diagram, "SystemDiagram",
                            { initialContentAlignment: go.Spot.Center });
                    function load() {
                        myDiagram.model = go.Model.fromJson({ "nodeDataArray": [
                                {"key":"1", "text":"服务器1","problem":true, "type":"S2", "loc":"195 225"},
                                {"key":"2", "text":"服务器2", "type":"M4", "loc":"183.5 94"},
                                {"key":"3", "text":"服务器3", "type":"P2", "loc":"75 211.5"},
                                {"key":"4", "text":"服务器4", "type":"S3", "loc":"306 225"},
                                {"key":"5", "text":"服务器5", "type":"M5", "loc":"288.5 95"},
                                {"key":"6", "text":"服务器6", "type":"P1", "loc":"426 211"},
                                {"key":"7", "text":"服务器7", "type":"I1", "loc":"-50 218"} ],
                                "linkDataArray": [
                                    {"from":"1", "to":"2"},
                                    {"from":"1", "to":"3"},
                                    {"from":"1", "to":"4"},
                                    {"from":"4", "to":"5"},
                                    {"from":"4", "to":"6"},
                                    {"from":"7", "to":"2"},
                                    {"from":"7", "to":"3"}
                                ]}
                        );
                    }

                    function nodeTypeImage(type) {
                        switch (type) {
                            case "S2": return "images/voice atm switch.jpg";
                            case "S3": return "images/server switch.jpg";
                            case "P1": return "images/general processor.jpg";
                            case "P2": return "images/storage array.jpg";
                            case "M4": return "images/iptv broadcast server.jpg";
                            case "M5": return "images/content engine.jpg";
                            case "I1": return "images/pc.jpg";
                            default: return "images/pc.jpg";
                        }
                        if (type.charAt(0) === "S") return
                        if (type.charAt(0) === "P") return "images/general processor.jpg";
                        if (type.charAt(0) === "M")
                            return "images/pc.jpg";
                    }

                    function nodeProblemConverter(msg) {
                        if (msg) return "red";
                        return null;
                    }

                    function nodeOperationConverter(s) {
                        if (s >= 2) return "TriangleDown";
                        if (s >= 1) return "Rectangle";
                        return "Circle";
                    }

                    function nodeStatusConverter(s) {
                        if (s >= 2) return "red";
                        if (s >= 1) return "yellow";
                        return "green";
                    }

                    myDiagram.nodeTemplate =
                        $(go.Node, "Vertical",
                            { locationObjectName: "ICON" },
                            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                            $(go.Panel, "Spot",
                                $(go.Panel, "Auto",
                                    { name: "ICON" },
                                    $(go.Shape,
                                        { fill: null, stroke: null },
                                        new go.Binding("background", "problem", nodeProblemConverter)),
                                    $(go.Picture,
                                        { margin: 5 },
                                        new go.Binding("source", "type", nodeTypeImage))
                                ),  // end Auto Panel
                                $(go.Shape, "Circle",
                                    { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft,
                                        width: 10, height: 10, fill: "orange" },
                                    new go.Binding("figure", "operation", nodeOperationConverter)),
                                $(go.Shape, "Triangle",
                                    { alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
                                        width: 10, height: 10, fill: "blue" },
                                    new go.Binding("fill", "status", nodeStatusConverter))
                            ),  // end Spot Panel
                            $(go.TextBlock,
                                new go.Binding("text"))
                        );  // end Node

                    function linkProblemConverter(msg) {
                        if (msg) return "red";
                        return "black";
                    }

                    myDiagram.linkTemplate =
                        $(go.Link, go.Link.AvoidsNodes,
                            { corner: 3 },
                            $(go.Shape,
                                { strokeWidth: 2 },
                                new go.Binding("stroke", "problem", linkProblemConverter))
                        );

                    load();



                }
            }
        });
    }


});
