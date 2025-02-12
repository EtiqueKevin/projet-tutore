function createFiles(file, code) {
    let fileCreationCommands = '';

    // Créer les fichiers à partir du JSON
    code.codes.forEach(code_info => {
        const fileName = code_info.fileName;
        const code = code_info.code;
        fileCreationCommands += `echo "${code}" > ${file}/${fileName} && `;
    });

    return fileCreationCommands += `echo "${code.testCode}" > ${file}/${code.fileTest} `;
}
module.exports = createFiles;