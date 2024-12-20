function createFiles(file, code) {
    console.log('Code : ', code);
    let fileCreationCommands = '';

    // Créer les fichiers à partir du JSON
    code.codes.forEach(code_info => {
        const fileName = code_info.fileName;
        const code = code_info.code;
        fileCreationCommands += `echo "${code}" > ${file}/${fileName} && `;
    });

    // Créer le fichier de test à partir de TEST_CODE
    return fileCreationCommands += `echo "${code.testCode}" > ${file}/MainTest.java `;
}
module.exports = createFiles;