const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();
app.use(bodyParser.json());

app.post('/python/validate', (req, res) => {
    console.log("debut");
    const { code, testCode } = req.body;

    const codeFilePath = path.join(__dirname, 'python/main.py');
    const testFilePath = path.join(__dirname, 'python/test_main.py');

    try {
        // Save the code to a file
        fs.writeFileSync(codeFilePath, code);
        fs.writeFileSync(testFilePath, testCode);

        if (!fs.existsSync(codeFilePath)) {
            return res.status(400).json({ error: 'Code file not found' });
        }

        if (!fs.existsSync(testFilePath)) {
            return res.status(400).json({ error: 'Test file not found' });
        }

        console.log(codeFilePath);
        console.log(testFilePath);
        console.log("avant");

        // Step 1: Syntax Check
        exec(`python3 -m py_compile ${codeFilePath}`, (syntaxErr, stdout, stderr) => {
            console.log("dedans");
            if (syntaxErr) {
                return res.status(400).json({ error: 'Syntax Error', details: stderr });
            }

            // Step 2: Code Execution
            exec(`python3 ${codeFilePath}`, (execErr, execStdout, execStderr) => {
                console.log("dedans2");
                if (execErr) {
                    return res.status(400).json({ error: 'Execution Error', details: execStderr });
                }

                // Step 3: Unit Test Validation
                exec(`pytest-3 ${testFilePath}`, (testErr, testStdout, testStderr) => {
                    console.log("dedans3");
                    if (testErr) {
                        console.log("caca");
                        return res.status(400).json({ error: 'Unit Test Error', details: testStderr });
                    }
                    else{
                        return res.status(200).json({ message: 'Code is correct', output: execStdout, testResults: testStdout });
                    }
                });
            });
        });
    } catch (error) {
        console.error(`Unexpected Error: ${error.message}`);
        return res.status(500).json({ error: 'Unexpected Error', details: error.message });
    }
});

app.listen(5400, () => {
    console.log('Python code validation service running on port 5400');
});