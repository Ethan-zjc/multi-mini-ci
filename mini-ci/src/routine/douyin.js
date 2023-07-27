const path = require("path");
const tma = require("tt-ide-cli");
const { getDescData } = require("../utils/index");

tma.setConfig({
    allowReportEvent: "no",
});

const appUpload = async (filePath, info = {}) => {
    return new Promise(async (resolve) => {
        const version = info.version;
        const env = info.environment;
        const desc = await getDescData(version, env);
        await tma.upload({
            project: {
                path: filePath,
            },
            qrcode: {
                format: "imageSVG",
                options: {
                    small: true,
                },
            },
            version,
            changeLog: desc,
            needUploadSourcemap: true,
        });
        resolve();
    })
};

const appPreview = async (filePath, outputFile) => {
    const previewResult = await tma.preview({
        project: {
            path: filePath,
        },
        page: {
            path: "",
            query: "",
            scene: "",
            launchFrom: "",
            location: "",
        },
        qrcode: {
            format: "imageFile",
            output: outputFile,
            options: {
                small: false,
            },
        },
        cache: true,
        copyToClipboard: true,
    });
    if (previewResult && previewResult.shortUrl) {
        console.log("app preview end");
    }
};

const appCheck = (config) => {
    return new Promise(async (resolve,reject) => {
        await tma.loginByEmail({
            email: config.email,
            password: config.password,
        });
        const { isValid } = await tma.checkSession();
        if (isValid) {
            resolve();
        } else {
            reject();
        }
    })
};

module.exports = {
    render: async (value) => {
        const { appId, entry, output, appToken, platform } = value;
        const projectFile = path.join(process.cwd(), `./${entry}`);
        const outputFile = path.join(process.cwd(),`./${output}/${platform}_${appId}.png`)
        const keyData = Buffer.from(appToken, "base64").toString("utf-8");
        await appCheck(JSON.parse(keyData));
        await appUpload(projectFile, value);
        appPreview(projectFile, outputFile);
    },
};
