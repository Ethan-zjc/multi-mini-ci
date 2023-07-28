const getDefaultConfig = () => {
    return {
        appName: "小程序",
        appId: "",
        appToken: "",
        keyPath: "",
        entry: "/",
        platform: "",
        source: "",
        projectId: 'ci',
        version: "1.0.0",
        originVersion: "",
        environment: "stag",
    }
};
module.exports = {
    getDefaultConfig
};