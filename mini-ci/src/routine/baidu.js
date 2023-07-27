// 使用全局依赖上传
const path = require("path");
const fs = require("fs");
const swan = require("swan-toolkit");
const { spawn } = require("child_process");
const { convertQrcode } = require("../utils/index");

const executeCommand = (command) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, { shell: true });

        childProcess.stdout.on("data", (data) => {
            const schemeUrl = JSON.parse(data).schemeUrl;
            resolve(schemeUrl);
        });

        childProcess.stderr.on("data", (data) => {
            console.log(`${data.toString()}`);
        });

        childProcess.on("close", (code) => {
            if (code !== 0) {
                reject(`命令执行失败，退出码: ${code}`);
            }
        });
    });
};

const appUpload = async (value) => {
    try {
        const {
            entry,
            output,
            appToken,
            remark,
            environment,
            version,
            platform,
            appId,
            minSwanVersion = "3.310.35",
        } = value;
        const outputFile = path.join(process.cwd(), `./${output}`);
        const projectFile = path.join(process.cwd(), `./${entry}`);
        const execString = `swan upload -p ${projectFile} --token ${appToken} --release-version ${version} --min-swan-version ${minSwanVersion} -d ${
            remark || environment
        } --verbose --json`;
        let result = await executeCommand(execString);
        if (result) {
            const url = result;
            const filePath = `${outputFile}/${platform}_${appId}.png`;
            if (!fs.existsSync(outputFile)) {
                fs.mkdirSync(outputFile);
            }
            if (url) {
                await convertQrcode(url, filePath);
            }
        }
        console.log("baidu upload result", result);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    render: (value) => {
        console.log("baidu routine ...");
        appUpload(value);
    },
};
