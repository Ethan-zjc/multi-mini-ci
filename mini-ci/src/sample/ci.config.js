
module.exports = {
    modules: [
        {
            appName: "小程序", // 必填
            appId: "", // 必填
            appToken: "", // 非必填
            keyPath: "/key", // 非必填，标注当前项目key文件相对路径
            entry: "", // 必填，当前项目相对路径入口
            output: "/dist", // 必填，当前项目相对路径输出
            platform: "weixin", // 必填，平台标识
            projectId: "wx", // 必填，自定义产品唯一标识
        },
    ]
};
