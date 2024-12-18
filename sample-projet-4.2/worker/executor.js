const { spawn } = require('child_process');

function createFiles(langage, req) {
    let fileCreationCommands = '';

    // Créer les fichiers à partir du JSON
    req.codes.forEach(code_info => {
        const fileName = code_info.fileName;
        const code = code_info.code;
        fileCreationCommands += `echo "${code}" > /code/${fileName} && `;
    });

    // Créer le fichier de test à partir de TEST_CODE
    switch (langage) {
        case 'java':
            return fileCreationCommands += `echo "${req.testCode}" > /code/MainTest.java `;
        case 'python':
            return fileCreationCommands + `echo "${req.testCode}" > /code/Test.py `;
        case 'javascript':
            return fileCreationCommands + `echo "${req.testCode}" > /code/index.js `;
        default: throw new Error('Extension de code non supportée');
    }
}

function getRunCommand(langage) {
    switch (langage) {
        case 'java': return `javac -cp /code/junit-4.12.jar:/code/hamcrest-core-1.3.jar /code/*.java &&
                             java -cp /code/junit-4.12.jar:/code/hamcrest-core-1.3.jar:/code org.junit.runner.JUnitCore MainTest`;
        case 'python': return `python -m unittest Test`;
        case 'javascript': return `node /code`;
        default: throw new Error('Run: Langage non supporté');
    }
}

async function execDocker(dockerImage, langage, req) {
    if (!dockerImage || !req.codes || !req.testCode) {
        throw new Error('Image Docker ou code source manquant');
    }

    return new Promise((resolve, reject) => {
        console.log('Vérification de l\'emplacement de Docker...');
        spawn('which', ['docker'], { stdio: 'inherit' }) // Ajouter une vérification de Docker
            .on('close', (code) => {
                if (code !== 0) {
                    reject('Docker CLI n\'est pas accessible.');
                    return;
                }

                console.log('Docker est disponible, exécution de la commande...');

                const dockerCommand = [
                    'run', '--privileged', '--rm',
                    '-e', `CODE_CONTENT=${JSON.stringify(req.codes)}, TEST_CONTENT=${JSON.stringify(req.testCode)}`,  // Passer le code source et le test
                    dockerImage,
                    'sh', '-c', `
                        # Créer les fichiers à partir des codes et du test
                        ${createFiles(langage, req)} && \

                        # Compiler et exécuter le code principal
                        ${getRunCommand(langage)}
                    `
                ];

                console.log('🚀 Commande exécutée : docker', dockerCommand.join(' '));

                const dockerProcess = spawn('docker', dockerCommand);

                let output = '';
                let errorOutput = '';

                //recuperation des sorties
                dockerProcess.stdout.on('data', (data) => output += data.toString());
                dockerProcess.stderr.on('data', (data) => errorOutput += data.toString());

                //envoie des sorties a la fermeture
                dockerProcess.on('close', (code) => {
                    if (code === 0) {
                        console.log(`✅ Exécution réussie en ${langage}`);
                        resolve({ output, error: null, status: 'success' });
                    } else {
                        console.error(`❌ Erreur d'exécution : ${errorOutput}`);
                        resolve({ output, error: errorOutput, status: 'failed' });
                    }
                });

                dockerProcess.on('error', (err) => {
                    console.error('❌ Erreur Docker :', err);
                    reject({ output: null, error: err.message, status: 'failed' });
                });
            });
    });
}

module.exports = { execDocker };
