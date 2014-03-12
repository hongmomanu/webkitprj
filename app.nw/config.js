/**
 * Created by jack on 13-12-18.
 */

var Globle={
    iswebapp:false,
    serverurl:"",
    username:"",
    password:"",
    displayname:"",
    isadmin:false

};

var exceptiontype={
    ping:"网络异常",
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
var missiontype={
    eqim:'国家局EQIM系统检查',
    eqimsucc:'国家局EQIM系统检查完成',
    eqimfail:'国家局EQIM系统检查异常',
    record:'断记统计上传',
    recordsucc:'断记统计上传成功',
    recordfail:'断记统计上传失败',
    waveform:'波形归档备份',
    waveformsucc:'波形归档备份成功',
    waveformfail:'波形归档备份异常',
    archivefile:'连续波形文件检查',
    earthquickfile:'地震事件文件检查',
    earthquicksucc:'地震事件文件检查成功',
    earthquickfail:'地震事件文件检查异常',
    archivefilesucc:'连续波形文件成功',
    archivefilefail:'连续波形文件异常',
    cataloging:'编目地震提醒',
    catalogingreport:'编目快报',
    catalogingreportsucc:'编目快报成功',
    catalogingreportfail:'编目快报失败'

}

