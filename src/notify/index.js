const path = require("path");
const fs = require("fs");
const { wecomMsg, dingtalkMsg } = require("./send");

const analysis = (options) => {
    const { modules, value, notify } = options;
    const { project = "", ver: originVersion = "", environment = "stag", qrcode = "", operator = "机器人", file = "" } = value;
    const { dingtalkToken, wecomToken } = notify;
    const params = modules.find((item) => item.projectId == project);
    const config = Object.assign({}, params, {
        environment,
        qrcode,
        operator,
        file,
    });
    if (originVersion) {
        Object.assign(config, {
            version: originVersion,
        })
    }
    if (dingtalkToken) {
        dingtalkMsg(dingtalkToken, config);
    }
    if (wecomToken) {
        wecomMsg(wecomToken, config);
    }
    if (!dingtalkToken && !wecomToken) {
        console.error("error: The notification configuration token does not exist");
    }
}

module.exports = function (value = {}) {
    const configFile = path.join(process.cwd(), "ci.config.js");
    if (!fs.existsSync(configFile)) {
        console.error("error: The configuration file does not exist");
        return false;
    };
    const { modules = [], notify = {} } = require(configFile);
    if (!value.project) {
        console.error("error: Params project required");
        return false;
    }
    if (!notify.enable) {
        console.error("error: The notification configuration enable does not exist");
        return false;
    }
    analysis({
        modules,
        value,
        notify
    });
};