function createFiles(file, code, langage) {
    let fileCreationCommands = '';

    switch (langage) {
        case 'python':
            code.codes.forEach(code_info => {
                const fileName = code_info.fileName;
                const code = code_info.code;
                fileCreationCommands += `echo "${code.replace(/(["$`'])/g, '$1')}" > ${file}/${fileName} && `;
            });
        
            fileCreationCommands += `echo "${code.testCode.replace(/(["$`'])/g, '$1')}" > ${file}/${code.fileTest} `;
            break;
        case 'java':
            code.codes.forEach(code_info => {
                const fileName = code_info.fileName;
                const code = code_info.code;
                fileCreationCommands += `echo "${code.replace(/(["$\\`'])/g, '\\$1')}" > ${file}/${fileName} && `;
            });
        
            fileCreationCommands += `echo "${code.testCode.replace(/(["\\$`'])/g, '\\$1')}" > ${file}/${code.fileTest} `;
            break;
        default:
            throw new Error('Unsupported language');
    }

    return fileCreationCommands;
}
module.exports = createFiles;
