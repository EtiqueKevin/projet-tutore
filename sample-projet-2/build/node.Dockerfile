FROM node:20

# Create app directory
WORKDIR /usr/src/app

COPY api ./
RUN npm install
RUN npm install pm2 -g

# Expose port and start application
EXPOSE 3000
CMD ["pm2-runtime", "ecosystem.config.js"]
