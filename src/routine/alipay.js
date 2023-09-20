const path = require("path");
const request = require('request');
const fs = require("fs");
const { minidev } = require("minidev");
const { addVersion, compareVersion } = require("../utils/index");

// 获取阿里平台最新版本号
const alipayList = async (value) => {
    const { appId, sourceList } = value;
    return new Promise(async (resolve) => {
        const res = sourceList.map(async (item) => {
            const uploadedVersion = await minidev.app.getUploadedVersion({
                appId: appId,
                clientType: item,
            });
            return {
                type: item,
                version: uploadedVersion,
            };
        });
        const resPromise = await Promise.all(res);
        resolve(resPromise);
    });
};

// 设置最新版本号
const alipayVersion = async (list) => {
    list.sort((a, b) => {
        return compareVersion(b.version, a.version);
    });
    const data = list[0] || {};
    const version = data.version || "";
    return addVersion(version);
};

const appUpload = async (filePath, info = {}) => {
    const { appId, platform } = info;
    const platformList = await alipayList(info);
    const customVersion = await alipayVersion(platformList);
    const platformItem = platformList.find(item => item.type == platform) || {};
    const uploadedVersion = platformItem.version || "";
    const options = {
        appId: appId,
        project: filePath,
        clientType: platform,
        deleteVersion: uploadedVersion,
        version: info.originVersion || customVersion,
    }
    await minidev.upload(options, {
        onLog: () => { },
    });
};

const appPreview = async (filePath, outputFile, info = {}) => {
    const {
        appId,
        platform,
    } = info;
    const { qrcodeUrl } = await minidev.preview({
        appId: appId,
        project: filePath,
        clientType: platform,
    });
    if (qrcodeUrl) {
        request.get(qrcodeUrl, (err, res) => {
            const url = res.request.uri.href;
            request(url).pipe(fs.createWriteStream(outputFile));
        });
    }
};

const appCheck = (keyFile, toolId) => {
    return new Promise(async (resolve) => {
        const privateKey = fs.readFileSync(keyFile).toString();
        await minidev.config.useRuntime({
            "alipay.authentication.privateKey": privateKey,
            "alipay.authentication.toolId": toolId,
        });
        resolve();
    })
}

module.exports = {
    render: async (value) => {
        const { entry, keyPath, appToken, output, projectId } = value;
        const keyFile = path.join(process.cwd(), `./${keyPath}`);
        const outputFile = path.join(process.cwd(), `./${output}/${projectId}.png`)
        await appCheck(keyFile, appToken);
        const projectFile = path.join(process.cwd(), `./${entry}`);
        await appUpload(projectFile, value);
        appPreview(projectFile, outputFile, value);
    },
};
