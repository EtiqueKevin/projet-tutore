const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const Docker = require('dockerode');
const { hostname } = require('os');

const app = express();
app.use(bodyParser.json());

const docker = new Docker();

const JUNIT_JAR = 'junit-4.12.jar';
const HAMCREST_JAR = 'hamcrest-core-1.3.jar';

app.post('/java/validate', async (req, res) => {
    
    const { codes, testCode, idUser } = req.body;

    if (!codes || !testCode || !idUser) {
        return res.status(400).send('Invalid input');
    }

    const volumePath = `/tmp/java/${idUser}`;

    if(!fs.existsSync(volumePath)) {
        fs.mkdirSync(volumePath, { recursive: true });
    }

    // Write code to Main.java
    codes.forEach(element => {
        fs.writeFileSync(`${volumePath}/${element.fileName}`, element.code);
    });

    // Write test code to MainTest.java
    fs.writeFileSync(`${volumePath}/Test.java`, testCode);

    try{

        const container  = await docker.createContainer({
            Image: 'java_exec',
            name: `java-${idUser}`,
            WorkingDir: '/usr/src/app',
            Tty: true,
            HostConfig: {
                Binds: [
                    `${volumePath}:/usr/src/app/code`
                ]
            }
        });

        await container.start();

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout( async () => {
                await container.stop();
                await container.remove();
                reject(new Error('Timeout error'));
            }, 20000);
        });

        // Compile code

        const execJavac = await container.exec ({
            Cmd: ['javac','-d', 'code' , 'code/*.java'],
            AttachStdout: true,
            AttachStderr: true
        });

        const streamJavac = await execJavac.start();

        streamJavac.on('data', async (data) => {
            console.log(data.toString());
        });

        const javacPromise = new Promise((resolve, reject) => {
            streamJavac.on ('end', resolve);
            streamJavac.on ('error', reject);
        });

        await Promise.race([javacPromise, timeoutPromise]);


        //verif fichiers compilés
        const execLs = await container.exec({
            Cmd: ['ls'],
            AttachStdout: true,
            AttachStderr: true
        });

        const streamLs = await execLs.start();

        let lsOutput = '';
        streamLs.on('data', async (data) => {
            lsOutput += data.toString();
        });

        await new Promise((resolve, reject) => {
            streamLs.on('end', resolve);
            streamLs.on('error', reject);
        });

        console.log(lsOutput + " caca boudin");

        //verif le chemin actuel 
        const execPwd = await container.exec({
            Cmd: ['pwd'],
            AttachStdout: true,
            AttachStderr: true
        });

        const streamPwd = await execPwd.start();

        let pwdOutput = '';
        streamPwd.on('data', async (data) => {
            pwdOutput += data.toString();
        });

        await new Promise((resolve, reject) => {
            streamPwd.on('end', resolve);
            streamPwd.on('error', reject);
        });

        console.log(pwdOutput + " caca boudin2");


        // Run test
        const execJavaTest = await container.exec({
            Cmd: ['java', '-cp', `${JUNIT_JAR}:${HAMCREST_JAR}`, 'org.junit.runner.JUnitCore', 'Test'],
            AttachStdout: true,
            AttachStderr: true
        });
        
        const streamJavaTest = await execJavaTest.start();

        let Output = '';
        streamJavaTest.on('data', async (data) => {
            Output += data.toString();
        });

        const javaTestPromise = new Promise((resolve, reject) => {
            streamJavaTest.on('end', resolve);
            streamJavaTest.on('error', reject);
        });

        await Promise.race ([javaTestPromise, timeoutPromise]);

        clearTimeout(timeoutPromise);

        await container.stop();
        await container.remove();

        res.json({ message: 'Code compiled and tested', data: Output });

    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error: ' + error);
    }
});

app.listen(8000, () => {
    console.log('Java code validation service running on port 8000');
});