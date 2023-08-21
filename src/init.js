const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");

const resetFile = function (projectFile, tempFile) {
    return new Promise((resolve, reject) => {
        let commond = `cp -r ${tempFile} ${projectFile}`;
        childProcess.exec(commond, {}, function (error) {
            if (error) {
                console.error({ error });
                return reject(error);
            }
            resolve();
        });
    });
};

module.exports = async function () {
    const configName = "ci.config.js";
    const configFile = path.join(process.cwd(), configName);
    if (fs.existsSync(configFile)) {
        console.error("error: The configuration file already exists");
    } else {
        const tempFile = path.join(__dirname,`./sample/${configName}`);
        await resetFile( path.join(process.cwd()),tempFile);
        console.log(`success: The configuration file is initialized successfully`);
    }
};
