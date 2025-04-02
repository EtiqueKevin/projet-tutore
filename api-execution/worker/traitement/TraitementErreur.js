function traitementErreur(erreur, langage) {
    let errors = {
        "message": erreur,
        "filename": "",
        "function": "",
        "type": 'system',
    }

    switch (langage) {
        case 'python':
            if (erreur.includes('AssertionError')) {
                let message = "=== TEST ÉCHOUÉ ===\n\n";

                // Extraire le nom du fichier
                const fileName = erreur.split('/').pop().split('.py')[0];
                errors.filename = fileName;

                // Extraire le nom de la fonction
                const functionName = erreur.split('def')[1].split('(')[0].trim();
                errors.function = functionName;

                // Extraire la valeur retournée
                if (erreur.includes('assert') && erreur.includes('where')) {
                    const lines = erreur.split('\n');
                    const actualValue = lines.find(line => line.includes('where'));
                    if (actualValue) {
                        const returnedValue = actualValue.split('where')[1].split('=')[0].trim();
                        message += `> Votre fonction a retourné: ${returnedValue}\n`;
                    }
                }

                // Extraire le message d'erreur
                if (erreur.includes('AssertionError:')) {
                    const assertMsg = erreur.split('AssertionError:')[1].split('\n')[0].trim();
                    message += `> ${assertMsg}\n`;
                }

                errors.message = message;
                errors.type = 'assertion';
            }
            return errors;

        case 'java':
            console.log(erreur);

            if (erreur.includes('AssertionError')) {
                let message = "=== TEST ÉCHOUÉ ===\n\n";

                // Extraire le nom du fichier et du test
                const testInfo = erreur.match(/\d+\) ([\w]+)\(([\w]+)\)/);
                if (testInfo) {
                    errors.filename = testInfo[2];
                    errors.function = testInfo[1];
                }

                // Extraire la valeur retournée         
                if (erreur.includes('expected:<') && erreur.includes('> but was:<')) {
                    const match = erreur.match(/expected:<(.+)> but was:<(.+)>/);
                    if (match) {
                        const expected = match[1];
                        const actual = match[2];
                        message += `> Votre fonction a retourné: ${actual}\n`;
                        message += `> Valeur attendue: ${expected}\n`;
                    }
                }

                // Extraire le message d'erreur
                if (erreur.includes('AssertionError:')) {
                    const assertMsg = erreur.split('AssertionError:')[1].split('\n')[0].trim();
                    const customMsg = assertMsg.split('expected')[0].trim();
                    message += `> ${customMsg}\n`;
                }

                errors.message = message;
                errors.type = 'assertion';
            }
            return errors;

        default:
            return erreur;
    }
}

module.exports = traitementErreur;