const express = require('express');
const httpProxy = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const amqp = require('amqplib/callback_api');
const Docker = require('dockerode');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
const apiProxy = httpProxy.createProxyServer();
const docker = new Docker();

amqp.connect('amqp://rabbitmq', (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }
    const queue = 'task_queue';

    channel.assertQueue(queue, {
      durable: true
    });

    app.post('/send', express.json(), (req, res) => {
      const msg = JSON.stringify(req.body);
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true
      });
      res.json({ message: 'Message sent to RabbitMQ', data: req.body });
    });

    app.get('/receive', (req, res) => {
      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(`Received: ${messageContent}`);
          channel.ack(msg);
          res.json({ message: `Received: ${messageContent}` });
        }
      });
    });
  });
});


app.use('/java', async (req, res, next) => {
  const idUser = req.body.idUser;
  if (!idUser) {
    return res.status(400).json({ error: 'Bad Request', details: 'idUser is required' });
  }
  let container;
  try {
    container = await docker.createContainer({
      Image: 'java_exec',
      name: `java_exec_${idUser}`,
      Tty: true,
    });
    await container.start();

    await docker.getNetwork('sample-projet-3_sample-projet.net').connect({
      Container: container.id,
      EndpointConfig: {
        Aliases: [`java_exec_${idUser}`]
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.use('/java', createProxyMiddleware({
  target: `http://java_exec_${idUser}:8000`,
  changeOrigin: true,
  pathRewrite: {
    '^/java': ''
  }
}));
    

app.listen(PORT, () => {
  console.log(`API Gateway running on port 3000`);
});