const getDefaultConfig = () => {
    return {
        appName: "小程序",
        appId: "",
        appToken: "",
        keyPath: "",
        entry: "/",
        output: "/dist",
        platform: "",
        source: "",
        projectId: 1,
        version: "1.0.0",
        environment: "stag",
    }
};
module.exports = {
    getDefaultConfig
};