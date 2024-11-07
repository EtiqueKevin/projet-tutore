const express = require('express');
const httpProxy = require('http-proxy');
const { createProxyMiddleware } = require('http-proxy-middleware');
const amqp = require('amqplib/callback_api');

const app = express();
const PORT = process.env.PORT || 3000;
const apiProxy = httpProxy.createProxyServer();

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

// New route for Python service
app.use('/python/validate', createProxyMiddleware({ target: 'http://localhost:5400', changeOrigin: true }));
// New route for Java service
app.use('/java/validate', createProxyMiddleware({ target: 'http://localhost:8000', changeOrigin: true }));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});