const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { execSync } = require('child_process');
const app = express();
app.use(bodyParser.json());

app.post('/test', (req, res) => {
    console.log("debut");
    const { code, testCode } = req.body;

    const codeFilePath = path.join(__dirname, 'main.py');
    const testFilePath = path.join(__dirname, 'test_main.py');

    // Save the code to a file
    fs.writeFileSync(codeFilePath, code);
    fs.writeFileSync(testFilePath, testCode);

    if (!fs.existsSync(codeFilePath)) {
        return res.status(400).json({ error: 'Code file not found'});
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
            if (execErr) {
                return res.status(400).json({ error: 'Execution Error', details: execStderr });
            }

            // Step 3: Unit Test Validation
            exec(`pytest ${testFilePath}`, (testErr, testStdout, testStderr) => {
                if (testErr) {
                    return res.status(400).json({ error: 'Unit Test Error', details: testStderr });
                }

                return res.json({ message: 'Code is correct', output: execStdout, testResults: testStdout });
            });
        });
    });
});

app.listen(1000, () => {
    console.log('Python code validation service running on port 5400');
});