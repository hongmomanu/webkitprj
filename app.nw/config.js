/**
 * Created by jack on 13-12-18.
 */

var Globle={
    iswebapp:false,
    serverurl:"",
    username:"",
    password:"",
    tel:"",
    dutytel:"",
    mapalertimg:"images/red.jpg",
    mapdownimg:"images/down.png",
    mapimg:"images/green.jpg",
    shadow:"images/shadow.jpg",
    displayname:"",
    isadmin:false

};

var AlertContent={


};

var exceptiontype={
    ping:"网络异常",
    stationcheck:'台站检测',
    mem:"内存危机",
    app:"服务异常",
    disk:"磁盘危机",
    ok:"服务正常"
};

var dutylogtype={
    logsucc:'登陆成功',
    logfail:'登陆失败',
    logoutsucc:'注销成功',
    logoutfail:'注销失败',
    ok:'完成'

};
var realstreamtype={
    relation:'相关分析'
};
var missiontype={
    eqim:'国家局EQIM系统检查',
    eqimsucc:'国家局EQIM系统检查完成',
    eqimfail:'国家局EQIM系统检查异常',
    record:'断记统计上传检查',
    recordno:'无断记',
    recordyes:'有断记',
    recordsucc:'断记统计上传成功',
    recordfail:'断记统计上传失败',
    waveform:'波形归档备份',
    waveformsucc:'波形归档备份成功',
    waveformfail:'波形归档备份异常',
    archivefile:'连续波形文件检查',
    earthquickfile:'地震事件文件检查',
    earthquicksucc:'无地震事件',
    earthquickfail:'有地震事件',
    archivefilesucc:'连续波形文件无异常',
    archivefilefail:'连续波形文件异常',
    cataloging:'编目地震提醒',
    catalogingfail:'编目地震提醒失败',
    catalogingreport:'编目快报',
    catalogingreportsucc:'编目快报成功',
    catalogingreportfail:'编目快报失败'

};
var searchlog_statue= [
    {"value":"", "name":"所有"},
    {"value":exceptiontype.ping, "name":exceptiontype.ping},
    {"value":exceptiontype.app, "name":exceptiontype.app},
    {"value":exceptiontype.disk, "name":exceptiontype.disk},
    {"value":exceptiontype.mem, "name":exceptiontype.mem},
    {"value":exceptiontype.ok, "name":exceptiontype.ok},
    {"value":exceptiontype.stationcheck, "name":exceptiontype.stationcheck},
    {"value":dutylogtype.logfail, "name":dutylogtype.logfail},
    {"value":dutylogtype.logsucc, "name":dutylogtype.logsucc},
    {"value":missiontype.earthquickfail, "name":missiontype.earthquickfail},
    {"value":missiontype.earthquicksucc, "name":missiontype.earthquicksucc},
    {"value":missiontype.archivefilefail, "name":missiontype.archivefilefail},
    {"value":missiontype.archivefilesucc, "name":missiontype.archivefilesucc},
    {"value":missiontype.catalogingreportfail, "name":missiontype.catalogingreportfail},
    {"value":missiontype.catalogingreportsucc, "name":missiontype.catalogingreportsucc},
    {"value":missiontype.eqimfail, "name":missiontype.eqimfail},
    {"value":missiontype.eqimsucc, "name":missiontype.eqimsucc},
    {"value":missiontype.recordfail, "name":missiontype.recordfail},
    {"value":missiontype.recordsucc, "name":missiontype.recordsucc},
    {"value":missiontype.waveformfail, "name":missiontype.waveformfail},
    {"value":missiontype.waveformsucc, "name":missiontype.waveformsucc}
];
if(!localStorage.serverurl)localStorage.serverurl="http://10.33.5.242:8080/lumprj/";
if(!localStorage.dutyalertinterval)localStorage.dutyalertinterval="60000";
if(!localStorage.stationinterval)localStorage.stationinterval="30000";
if(!localStorage.eqimurl)localStorage.eqimurl="http://10.5.160.37:8180/gonggao/news.jsp";
if(!localStorage.reporturl)localStorage.reporturl="http://10.5.202.22/bianmu/signon_rec.jsp";
if(!localStorage.recordurl)localStorage.recordurl="http://10.33.253.103:8080/JOPENSWeb/mon/logStation";
if(!localStorage.reportloginurl)localStorage.reportloginurl="http://10.5.202.22/bianmu/validate.jsp";
if(!localStorage.reportusername)localStorage.reportusername="ZJ33";
if(!localStorage.reportpassword)localStorage.reportpassword="123456";
if(!localStorage.catalogtel)localStorage.catalogtel="13336151145";
if(!localStorage.wavedir)localStorage.wavedir="/Users/au2/2014/";
if(!localStorage.eventdir)localStorage.eventdir="/Users/au2/2014evt/";
if(!localStorage.archiveminsize)localStorage.archiveminsize="100";
if(!localStorage.crossalert)localStorage.crossalert="50";

