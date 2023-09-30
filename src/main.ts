import 'dotenv/config';

import WAWebBot, { Client } from 'whatsapp-web.js';
import { handler as onMessageHandler } from './handlers/on-message.handler.ts';
import { handler as onQRHandler } from './handlers/on-qr.handler.ts';

const client = new Client({
  authStrategy: new WAWebBot.LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.initialize();

client.on('qr', onQRHandler);

client.on('auth_failure', (error) => {
  console.log({ error });
});

client.on('authenticated', () => {
  console.log('You are authenticated!');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', onMessageHandler);
