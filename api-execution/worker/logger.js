// logger.js
const { createWriteStream } = require('fs');
const { join } = require('path');

// Assurez-vous que le répertoire des logs existe
const fs = require('fs');
const dir = './logs';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const logStreamError = createWriteStream(join(dir, 'error.log'), { flags: 'a' });
const logStreamInfo = createWriteStream(join(dir, 'info.log'), { flags: 'a' });

const logFormatter = (messages, language) => {
    const timestamp = new Date().toLocaleDateString('fr-FR', {
        timeZone: 'Europe/Paris',
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    return `[${timestamp}] ${language} : ${messages[1]}`;
};

class Logger {

    static handler = null;
    static language = '';

    static setLanguage(language) {
        this.language = language;
    }

    static setHandler(handler) {
        this.handler = handler;
    }

    static log(level, message) {
        if (this.handler) {
            this.handler([level, message], { level }, this.language);
        }
    }

    static info(message) {
        this.log('INFO', message);
    }

    static error(message) {
        this.log('ERROR', message);
    }
}

Logger.setHandler((messages, context, language) => {
    const formattedMessage = logFormatter(messages, language);
    if (context.level === 'ERROR') {
        logStreamError.write(null);
    } else {
        logStreamInfo.write(null);
    }
});

module.exports = Logger;