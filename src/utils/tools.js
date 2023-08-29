// 获取描述信息
const getDescData = (version = "1.0.0", env = "stag") => {
    return new Promise((resolve) => {
        resolve(`v${version} ${env}`);
    });
};

// 日期时间格式化
const formatDate = (date, fmt) => {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'H+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    if (/(h+)/.test(fmt)) {
        var hour = date.getHours();
        if (hour > 12) {
            hour = hour - 12;
        } else if (hour == 0) {
            hour = 12;
        }
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? hour : ('00' + hour).substr(('' + hour).length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
    return fmt;
};

module.exports = {
    getDescData,
    formatDate,
};
