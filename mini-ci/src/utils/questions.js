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
            name: "version",
            message: "请输入版本号（必填，示例：1.0.0）:",
            validate: (input) => {
                if (!input) {
                    return '请输入版本号';
                }
                return true;
            },
        },
    ];
};
module.exports = {
    getQuestions
};