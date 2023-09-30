import type { Message } from 'whatsapp-web.js';
import { prisma } from '../lib/prisma.ts';
import type { User } from '@prisma/client';

const ALLOWED_GROUPS = {
  Chonkys: 'Chonkys',
} as const;

const allowedGroups = Object.values<string>(ALLOWED_GROUPS);

const BOT_DISCLAIMER = '*BOT*';

const getMessageWithBotDisclaimer = (message: string) => {
  return `${message} ${BOT_DISCLAIMER}`;
};

const isAllowedGroup = (groupName: string) => allowedGroups.includes(groupName);

const getUser = async (externalWhatsAppId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        external__whatsAppId: externalWhatsAppId,
      },
      include: {
        counter: true,
      },
    });

    const isUserStored = user != null;

    if (!isUserStored) {
      throw new Error('User not found, proceeding to create one');
    }

    return user;
  } catch (error) {
    console.log(error instanceof Error ? error.message : 'Unknown error');

    const user = await prisma.user.create({
      data: {
        external__whatsAppId: externalWhatsAppId,
        counter: {
          connectOrCreate: {
            create: {},
            where: {
              userWhatsAppId: externalWhatsAppId,
            },
          },
        },
      },
      include: {
        counter: true,
      },
    });

    return user;
  }
};

export const handler = async (message: Message) => {
  const chat = await message.getChat();

  if (chat.isGroup) {
    const willReply = isAllowedGroup(chat.name);

    if (!willReply) {
      console.error(`Ignoring message from ${chat.name} group`);

      return;
    }

    if (!message.body.includes('💩')) {
      console.log(`Ignoring message, is not a poop notification`);

      return;
    }

    const contact = await message.getContact();

    const storedUser = await getUser(contact.id.user);

    console.log(
      `Replying to message from ${contact.name} in ${chat.name} group`,
    );

    const currentCount = storedUser.counter?.count ?? 1;

    message.reply(
      getMessageWithBotDisclaimer(
        `${contact.name} ha cagado ${currentCount} veces`,
      ),
    );

    await prisma.counter.update({
      where: {
        userWhatsAppId: contact.id.user,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  }
};
