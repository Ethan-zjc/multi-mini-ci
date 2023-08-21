const getQuestions = (options = []) => {
    return [
        {
            type: "list",
            name: "projectId",
            message: "请选择构建项目",
            choices: options.map(item => {
                const { appName, projectId } = item;
                return {
                    name: appName,
                    value: projectId,
                };
            }),
        },
        {
            type: "list",
            name: "environment",
            message: "请选择环境",
            choices: [
                {
                    name: "测试环境",
                    value: "stag",
                },
                {
                    name: "正式环境",
                    value: "master",
                },
            ],
        },
        {
            type: "input",
            name: "originVersion",
            message: "请输入上传版本号（默认：1.0.0）:",
        },
    ];
};
module.exports = {
    getQuestions
};