const path = require("path");
const request = require('request');
const fs = require("fs");
const { minidev } = require("minidev");

const appUpload = async (filePath, info = {}) => {
    const {
        appId,
        platform,
        version
    } = info;
    const versionString = await minidev.app.getUploadedVersion({
        appId: appId,
        clientType: platform,
    });
    await minidev.upload({
        appId: appId,
        project: filePath,
        clientType: platform,
        deleteVersion: versionString,
        // version: version,
    }, {
        onLog: () => {},
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
        request.get(qrcodeUrl, (err,res) => {
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
        const { appId, entry, keyPath, appToken, output, platform } = value;
        const keyFile = path.join(process.cwd(), `./${keyPath}`);
        const outputFile = path.join(process.cwd(),`./${output}/${platform}_${appId}.png`)
        await appCheck(keyFile, appToken);
        const projectFile = path.join(process.cwd(), `./${entry}`);
        await appUpload(projectFile, value);
        appPreview(projectFile, outputFile, value);
    },
};
