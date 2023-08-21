const qrcode = require("qrcode");

const convertQrcode = (url, filePath) => {
    return new Promise((resolve, reject) => {
        qrcode.toFile(
            filePath,
            url,
            {
                errorCorrectionLevel: "H",
                type: "png",
                margin: 2,
                scale: 6,
            },
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(err);
                }
            }
        );
    })
}

module.exports = {
    convertQrcode
};

