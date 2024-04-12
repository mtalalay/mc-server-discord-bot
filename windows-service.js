import { Service } from 'node-windows'
const svc = new Service({
  name: 'Discord MC Server Backend',
  description: 'The backend to a discord bot that starts and stops a minecraft server.',
  script: 'bot.js'
});
svc.on('install', () => {
  svc.start();
});
svc.install();