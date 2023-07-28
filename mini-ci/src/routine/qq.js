const path = require("path");
const fs = require("fs");
const Docker = require("dockerode");
const docker = new Docker();

const checkQrcodeOutput = (value) => {
    const { output, entry, projectId } = value;
    const outputFile = path.join(process.cwd(), `./${output}`);
    const project = path.join(process.cwd(), `./${entry}`);
    if (!fs.existsSync(outputFile)) {
        fs.mkdirSync(outputFile);
    }
    if (fs.existsSync(`${project}/qrcode.png`)) {
        fs.renameSync(`${project}/qrcode.png`, `${outputFile}/${projectId}.png`);
    }
}

const runContainer = async (value) => {
    const {
        entry,
        appToken,
        remark,
        environment,
        version,
        experience = true,
        buildUser = "robot",
        firstPage = "",
    } = value;
    const envVariables = {
        PLUGIN_VERSION: version,
        PLUGIN_DESC: remark || environment,
        PLUGIN_APPTOKEN: appToken, // 开发设置->AppToken
        PLUGIN_EXPERIENCE: experience, // 是否设置当前上传为体验版本
        PLUGIN_PREVIEW: false,
        PLUGIN_BUILDUSER: buildUser,
        PLUGIN_FIRSTPAGE: firstPage,
        PLUGIN_USEPACKAGEJSON: false,
        PLUGIN_NPMBUILD: false,
        PLUGIN_SOURCECODEPATH: "./",
    };

    const hostVolume = path.join(process.cwd(), `./${entry}`);
    const containerVolume = "/tmp";

    const containerConfig = {
        Image: "qqminiapp/build:latest",
        Cmd: [],
        Env: Object.entries(envVariables).map(
            ([key, value]) => `${key}=${value}`
        ),
        HostConfig: {
            AutoRemove: true,
            Binds: [`${hostVolume}:${containerVolume}`],
        },
        WorkingDir: containerVolume,
    };

    try {
        const container = await docker.createContainer(containerConfig);
        await container.start();

        // 监听容器输出
        container.logs({
            follow: true,
            stdout: true,
            stderr: true,
        }, (err, stream) => {
            if (err) {
                console.error("Error listening to container logs:", err);
                return;
            }
            stream.on("data", (chunk) => {
                const output = chunk.toString();
                console.log(output);
            });
            stream.on("end", () => {
                console.log("Container logs stream ended");
                checkQrcodeOutput(value);
            });
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

const checkDocker = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await docker.ping();
            resolve();
        } catch (error) {
            reject("Docker is not running");
        }
    })
};

const appUpload = async (value) => {
    try {
        const stream = await docker.pull("qqminiapp/build:latest");
        stream.on("data", (chunk) => {
            console.log(chunk.toString());
        });
        stream.on("end", () => {
            runContainer(value);
        });
    } catch (error) {
        console.error("docker.pull qqminiapp/build:latest Error:", error);
    }
};

module.exports = {
    render: async (value) => {
        try {
            console.log("QQ routine ...");
            await checkDocker();
            await appUpload(value);
        } catch (error) {
            console.error(error);
        }
    },
};
