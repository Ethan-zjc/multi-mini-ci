const request = require("request");
const { formatDate } = require("../utils");

const postWebhook = (url, markdown) => {
    return new Promise((resolve, reject) => {
        request.post({
            url,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                msgtype: "markdown",
                markdown,
            }
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    })
}

const getMarkdown = (type, options) => {
    const {
        appName = "小程序",
        projectId = "weixin",
        version = "1.0.0",
        environment = "stag",
        operate = "机器人",
        qrcode = "",
    } = options;
    let markdownText = `### ${appName}`;
    const updateTime = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");
    const markdownList = [{
        label: '当前平台:',
        value: projectId
    }, {
        label: '当前环境:',
        value: environment
    }, {
        label: '最新版本:',
        value: `v${version}`
    }, {
        label: '发起人:',
        value: operate
    }, {
        label: '更新时间:',
        value: updateTime
    }]
    markdownList.forEach(item => {
        const label = type == 'dingtalk' ? `#### ${item.label}` : item.label;
        markdownText += `\n${label} ${item.value}`;
    })
    if (qrcode) {
        if (type == 'wecom') {
            markdownText += `\n [二维码链接](${qrcode})`;
        } else {
            markdownText += `\n ![qrcode](${qrcode})`;
        }
    }
    return markdownText;
}

const dingtalkMsg = async (token, options = {}) => {
    try {
        const requestUrl = `https://oapi.dingtalk.com/robot/send?access_token=${token}`;
        const markdownText = getMarkdown('dingtalk', options);
        const res = await postWebhook(requestUrl, {
            title: '小程序部署',
            text: markdownText,
        })
        if (res.errcode === 0) {
            console.log('success: Dingtalk');
        } else {
            console.error('error: Dingtalk', res.errmsg);
        }
    } catch (error) {
        console.error('error: Dingtalk request', error);
    }
}

const wecomMsg = async (token, options = {}) => {
    try {
        const requestUrl = `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`;
        const markdownText = getMarkdown('wecom', options);
        const res = await postWebhook(requestUrl, {
            content: markdownText,
        })
        if (res.errcode === 0) {
            console.log('success: Wecom');
        } else {
            console.error('error: Wecom', res.errmsg);
        }
    } catch (error) {
        console.error('error: Wecom request', error);
    }
}

module.exports = {
    wecomMsg,
    dingtalkMsg
};
