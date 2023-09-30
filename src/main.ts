import QRCode from 'qrcode';
import WAWebBot, { Client } from 'whatsapp-web.js';

const client = new Client({
  authStrategy: new WAWebBot.LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

client.initialize();

client.on('qr', (qr) => {
  QRCode.toString(
    qr,
    {
      small: true,
      type: 'terminal',
    },
    (error, url) => {
      if (error instanceof Error) {
        throw error;
      }

      console.log(url);
    },
  );
});

client.on('auth_failure', (error) => {
  console.log({ error });
});

client.on('authenticated', () => {
  console.log('You are authenticated!');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  console.log({ message: message.body });
});
