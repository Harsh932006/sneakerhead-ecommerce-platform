const imageKit = require("../config/imagekit");

const uploadImage = async (file) => {
    const result = await imageKit.upload({
        file: file.buffer,
        fileName: file.originalname,
    })

    return result;
}

const deleteImage = async (fileId) => {
    await imageKit.deleteFile(fileId);
}

module.exports = {uploadImage, deleteImage};