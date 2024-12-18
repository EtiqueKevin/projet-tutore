const express = require('express');
const httpProxy = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const amqp = require('amqplib/callback_api');
const Docker = require('dockerode');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

    let bool = false; 
    while (!bool) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const containers = await docker.listContainers({ all: true });
      bool = containers.some(c => c.Names.includes(`/java_exec_${idUser}`));
    }

    // Pass the request to the next middleware (proxy)
    next();

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.use('/java', (req, res, next) => {
  console.log(req.body);
  const idUser = 'caca';
  if (!idUser) {
    return res.status(400).json({ error: 'Bad Request', details: 'idUser is required' });
  }

  const targetUrl = `http://java_exec_${idUser}:8000`;
  const proxy = createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
    timeout: 10000, // Ajoutez un délai d'attente de 10 secondes
    proxyTimeout: 10000, // Ajoutez un délai d'attente de 10 secondes pour le proxy
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxy request for user ${idUser} to ${proxyReq.path}`);
      console.log(`url à appeler : ${targetUrl}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Proxy response received for user ${idUser} with status ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`Proxy error for user ${idUser}:`, err);
      res.status(500).json({ error: 'Proxy Error', details: err.message });
    }
  });

  proxy(req, res, next);
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});