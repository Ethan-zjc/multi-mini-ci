const path = require("path");
const ci = require("miniprogram-ci");
const { getDescData } = require("../utils/index");

const setProject = (appId, projectFile, keyFile) => {
    return new Promise((resolve, reject) => {
        try {
            const project = new ci.Project({
                appid: appId, // 小程序appid
                type: "miniProgram", // 类型，小程序或小游戏
                projectPath: projectFile, // 项目路径
                privateKeyPath: keyFile, // 密钥路径
                ignores: ["node_modules/**/*"], // 忽略的文件
            });
            resolve(project);
        } catch (error) {
            reject(error);
        }
    });
};

const appUpload = async (project, info = {}) => {
    const version = info.version;
    const env = info.environment;
    const desc = await getDescData(version, env);
    await ci.upload({
        project,
        version,
        desc,
        setting: {
            es6: true, // 对应小程序开发者工具的 "es6 转 es5"
            es7: true, // 小程序开发者工具的 "增强编译"
            codeProtect: true, // 小程序开发者工具的 "代码保护"
            autoPrefixWXSS: true, // 小程序开发者工具的 "样式自动补全"
            minify: true, // 压缩所有代码，对应小程序开发者工具的 "压缩代码"
        },
    });
};

const appPreview = async (project, outputFile) => {
    await ci.preview({
        project,
        setting: {
            es6: true,
            es7: true,
            codeProtect: true,
            autoPrefixWXSS: true,
            minify: true,
        },
        qrcodeFormat: "image",
        qrcodeOutputDest: outputFile,
        onProgressUpdate: console.log,
    });
};

module.exports = {
    render: async (value) => {
        const { entry, appId, keyPath, output, platform } = value;
        const keyFile = path.join(process.cwd(), `./${keyPath}`);
        const outputFile = path.join(process.cwd(),`./${output}/${platform}_${appId}.png`)
        const projectFile = path.join(process.cwd(), `./${entry}`);
        const project = await setProject(appId, projectFile, keyFile);
        await appUpload(project, value);
        appPreview(project, outputFile);
    },
};
