function traitementErreur(erreur, langage) {
    switch (langage) {
        case 'python':
            if (erreur.includes('AssertionError')) {
                let message = "=== TEST ÉCHOUÉ ===\n\n";

                if (erreur.includes('assert') && erreur.includes('where')) {
                    const lines = erreur.split('\n');
                    const actualValue = lines.find(line => line.includes('where'));
                    if (actualValue) {
                        const returnedValue = actualValue.split('where')[1].split('=')[0].trim();
                        message += `> Votre fonction a retourné: ${returnedValue}\n`;
                    }
                }

                if (erreur.includes('AssertionError:')) {
                    const assertMsg = erreur.split('AssertionError:')[1].split('\n')[0].trim();
                    message += `> ${assertMsg}\n`;
                }
                
                return message;
            }
            return erreur;
            
        case 'java':
            if (erreur.includes('AssertionError')) {
                let message = "=== TEST ÉCHOUÉ ===\n\n";
                
                if (erreur.includes('expected:<') && erreur.includes('> but was:<')) {
                    const match = erreur.match(/expected:<(.+)> but was:<(.+)>/);
                    if (match) {
                        const expected = match[1];
                        const actual = match[2];
                        message += `> Votre fonction a retourné: ${actual}\n`;
                        message += `> Valeur attendue: ${expected}\n`;
                    }
                }

                if (erreur.includes('AssertionError:')) {
                    const assertMsg = erreur.split('AssertionError:')[1].split('\n')[0].trim();
                    const customMsg = assertMsg.split('expected')[0].trim();
                    message += `> ${customMsg}\n`;
                }

                return message;
            }
            return erreur;
            
        default:
            return erreur;
    }
}

module.exports = traitementErreur;