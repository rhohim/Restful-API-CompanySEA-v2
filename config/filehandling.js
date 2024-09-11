const ImageKit = require('imagekit');
const ik = new ImageKit({ 
    publicKey: "public_F5lvc2Whw1cbK+bUiWWAaNJ3eRw=",
    privateKey: "private_4CLfPmDyiaRqCAGxkT4jIiwEc+4=",
    urlEndpoint: "https://ik.imagekit.io/cretivox"
  }); 

async function uploadFile(file) {
    if (!file) return "";
    const uploadResponse = await ik.upload({
        file: file.buffer,
        fileName: file.originalname,
    });
    return uploadResponse.url;
}

module.exports = {
    uploadFile
};