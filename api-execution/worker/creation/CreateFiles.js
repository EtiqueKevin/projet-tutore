function createFiles(file, code) {
    let fileCreationCommands = '';

    code.codes.forEach(code_info => {
        const fileName = code_info.fileName;
        const code = code_info.code;
        fileCreationCommands += `echo "${code.replace(/(["$`'])/g, '$1')}" > ${file}/${fileName} && `;
    });

    return fileCreationCommands += `echo "${code.testCode.replace(/(["$`'])/g, '$1')}" > ${file}/${code.fileTest} `;
}
module.exports = createFiles;
