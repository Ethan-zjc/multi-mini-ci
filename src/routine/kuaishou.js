const path = require("path");
const ci = require("ks-miniprogram-ci");
const fs = require("fs");
const { getDescData } = require("../utils/index");

const setProject = (appId, projectFile, keyFile) => {
    return new Promise((resolve, reject) => {
        try {
            const project = new ci.Project({
                appid: appId,
                type: "miniProgram",
                projectPath: projectFile,
                privateKeyPath: keyFile,
                ignores: ["node_modules/**/*"],
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
    try {
        const uploadResult = await ci.upload({
            project,
            version,
            desc,
            onProgressUpdate: () => { },
        });
        if (uploadResult && uploadResult.subPackageInfo.length > 0) {
            console.log("success:End of build");
        }
    } catch (error) {
        console.error("error:Build error");
    }
};

const appPreview = async (project, outputFile) => {
    const previewResult = await ci.preview({
        project,
        qrcodeFormat: "image",
        qrcodeOutputDest: outputFile,
        onProgressUpdate: () => { },
    });
};

const appCheck = (keyFile) => {
    return new Promise((resolve, reject) => {
        fs.chmod(keyFile, "700", async (err) => {
            if (err) {
                console.error("error:Permission key");
                reject();
            } else {
                resolve();
            }
        });
    })
}

module.exports = {
    render: async (value) => {
        const { appId, entry, output, keyPath, projectId } = value;
        const keyFile = path.join(process.cwd(), `./${keyPath}`);
        await appCheck(keyFile);
        const projectFile = path.join(process.cwd(), `./${entry}`);
        const outputFile = path.join(process.cwd(), `./${output}/${projectId}.png`)
        const project = await setProject(appId, projectFile, keyFile);
        await appUpload(project, value);
        appPreview(project, outputFile);
    },
};
