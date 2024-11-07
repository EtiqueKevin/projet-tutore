module.exports = {
    apps: [
      {
        name: 'api-gateway',
        script: 'index.js',
        cwd: '/usr/src/app',
        watch: true,
      },
      {
        name: 'python-service',
        script: 'python/python.js',
        cwd: '/usr/src/app',
        watch: true,
      },
      {
        name: 'java-service',
        script: 'java/java.js',
        cwd: '/usr/src/app',
        watch: true,
      },
    ],
  };