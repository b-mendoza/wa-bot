import type { Message } from 'whatsapp-web.js';

const ALLOWED_GROUPS = {
  Chonkys: 'Chonkys',
} as const;

const allowedGroups = Object.values<string>(ALLOWED_GROUPS);

const BOT_DISCLAIMER = '*BOT*';

const getMessageWithBotDisclaimer = (message: string) => {
  return `${message} ${BOT_DISCLAIMER}`;
};

const isAllowedGroup = (groupName: string) => allowedGroups.includes(groupName);

export const handler = async (message: Message) => {
  const chat = await message.getChat();

  if (chat.isGroup) {
    const willReply = isAllowedGroup(chat.name);

    if (!willReply) {
      console.error(`Ignoring message from ${chat.name} group`);

      return;
    }

    message.reply(getMessageWithBotDisclaimer(message.body));
  }
};
