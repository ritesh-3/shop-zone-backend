
const fs = require('fs');
const path = require('path');
const { AppConfigs } = require('../AppConfig');
const url = require('url')
const appConfigs = AppConfigs();
/**
 * 
 * @param {string} activationUrlTemplate 
 * @param {string} activationToken 
 * @returns { }
 */
const replaceActivationToken = (string, activationToken) => {
    return string.replace("${activationToken}", activationToken);
}


// Create a folder if it doesn't exist
const createFolderIfNotExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
};

// Rename a file
const renameFile = (oldPath, newPath) => {
    fs.renameSync(oldPath, newPath);
};


// Get a valid URL for accessing the uploaded file
const getFileUrl = (folderPath, fileName) => {
    const baseUrl = AppConfigs().SERVER_BASE_URL
    const relativePath = path.relative('uploads', folderPath);
    const fileUrl = `${baseUrl}/${relativePath}/${fileName}`;
    return fileUrl;
};



// Upload a file to a folder named after email
const uploadFileToEmailFolder = (file, email, custName = "") => {
    const originalName = file.originalname;
    const extension = originalName.split('.').pop();
    let customName = custName ? `${custName}.${extension}` : `${Date.now()}_${email}.${extension}`;
    const folderPath = path.join(appConfigs.FILE_UPLOAD_ROOT_FOLDER, email);
    const filePath = path.join(folderPath, customName);

    createFolderIfNotExists(folderPath);

    // Delete existing file if it already exists
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    renameFile(file.path, filePath);

    const fileUrl = getFileUrl(folderPath, customName);

    return fileUrl;
};

// Delete an image file from storage
const deleteImageFile = (filePath, baseFolder="") => {
     filePath = path.join(baseFolder,filePath)
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
    }
};

extractLocalFilePath = (fullImageUrl) => {
    // const localFilePath = path.basename(url.parse(fullImageUrl).pathname);
    const localFilePath = url.parse(fullImageUrl).pathname
    return  localFilePath ;
}

// Upload multiple files to a folder named after email
const uploadFilesToFolder = (files, email, custFolder, custNames = []) => {
    const emailFolderPath = path.join('uploads/', email);
    createFolderIfNotExists(emailFolderPath);

    const uploadedFiles = [];

    files.forEach((file, index) => {
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const customName = custNames[index] ? `${custNames[index]}.${extension}` : `${Date.now()}_${email}.${extension}`;
        const customFolder = custFolder ?? 'store'
        const folderPath = path.join(emailFolderPath, customFolder);
        const filePath = path.join(folderPath, customName);

        createFolderIfNotExists(folderPath);

        // Delete existing file if it already exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        renameFile(file.path, filePath);

        const fileUrl = getFileUrl(folderPath, customName);

        uploadedFiles.push(fileUrl);
    });

    return uploadedFiles;
}


module.exports = { replaceActivationToken, renameFile, uploadFileToEmailFolder, extractLocalFilePath,
     uploadFilesToFolder, deleteImageFile }