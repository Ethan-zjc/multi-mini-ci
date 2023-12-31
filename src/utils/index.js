const { getQuestions } = require("./questions");
const { getDefaultConfig } = require("./defConfig");
const { getDescData, formatDate, addVersion, compareVersion } = require("./tools");
const { convertQrcode } = require("./qrcode");
module.exports = {
    getQuestions,
    getDefaultConfig,
    getDescData,
    convertQrcode,
    formatDate,
    addVersion,
    compareVersion,
};