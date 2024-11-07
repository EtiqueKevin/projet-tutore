
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const JUNIT_JAR = path.join(__dirname, 'junit-4.12.jar');
const HAMCREST_JAR = path.join(__dirname, 'hamcrest-core-1.3.jar');


app.post('/java/validate', (req, res) => {
    const { code, testCode } = req.body;

    // Write code to Main.java
    fs.writeFileSync('/tmp/Main.java', code);

    // Write test code to MainTest.java
    fs.writeFileSync('/tmp/MainTest.java', testCode);

    // Step 1: Syntax Check (Compilation)
    exec('javac /tmp/Main.java', (syntaxErr, stdout, stderr) => {
        if (syntaxErr) {
            return res.status(400).json({ error: 'Syntax Error', details: stderr });
        }

        // Step 2: Code Execution
        exec('java -cp /tmp Main', (execErr, execStdout, execStderr) => {
            if (execErr) {
                return res.status(400).json({ error: 'Execution Error', details: execStderr });
            }

            // Step 3: Unit Test Validation
            exec(`javac -cp /tmp:${JUNIT_JAR} -d /tmp /tmp/MainTest.java && java -cp /tmp:${JUNIT_JAR}:${HAMCREST_JAR} org.junit.runner.JUnitCore MainTest`, (testErr, testStdout, testStderr) => {                if (testErr) {
                    return res.status(400).json({ error: 'Unit Test Error', details: testStderr });
                }

                res.json({ message: 'Code is correct', output: execStdout, testResults: testStdout });
            });
        });
    });
});

app.listen(8000, '0.0.0.0', () => {
    console.log('Java code validation service running on port 8000');
});