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


app.use('/java', (req, res, next) => {
  console.log(`Proxying request to: http://exec.java.sample-projet:8000${req.url}`);
  next();
}, createProxyMiddleware({
  target: 'http://exec.java.sample-projet:8000',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxy request headers: ${JSON.stringify(proxyReq.getHeaders())}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Proxy response status: ${proxyRes.statusCode}`);
  },
  onError: (err, req, res) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}));
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});