// 获取描述信息
const getDescData = (version = "1.0.0", env = "stag") => {
    return new Promise((resolve) => {
        resolve(`v${version} ${env}`);
    });
};

module.exports = {
    getDescData,
};
