const { getQuestions } = require("./questions");
const { getDefaultConfig } = require("./defConfig");
const { getDescData } = require("./tools");
const { convertQrcode } = require("./qrcode");
module.exports = {
    getQuestions,
    getDefaultConfig,
    getDescData,
    convertQrcode
};