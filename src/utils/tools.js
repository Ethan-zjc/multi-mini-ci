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

// 版本号递增
const addVersion = (value = '1.0.0') => {
    const verAry = value.split('.');
    let ver1 = parseInt(verAry[0] || 0);
    let ver2 = parseInt(verAry[1] || 0);
    let ver3 = parseInt(verAry[2] || 10);
    let verAdd = ver3 + 1;
    if (verAdd > 99) {
        verAdd = 10;
        ver2++;
        if (ver2 > 9) {
            ver2 = 0;
            ver1++;
        }
    } else if (verAdd < 10) {
        verAdd = `0${verAdd}`;
    }
    return `${ver1}.${ver2}.${verAdd}`;
};

//版本号对比，返回1、0、-1
const compareVersion = (v1, v2) => {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);

        if (num1 > num2) {
            return 1;
        } else if (num1 < num2) {
            return -1;
        }
    }

    return 0;
};

module.exports = {
    getDescData,
    formatDate,
    addVersion,
    compareVersion,
};
