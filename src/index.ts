import { Telegraf } from 'telegraf';

import { checkBotTokenProvided } from './utils/checkBotTokenProvided';

// TODO figure out how to use env vars in bundled scripts
const botToken = '1491024581:AAF_WY8v6n4zCCcch1lRvO5A9eGxA2-613U';

if (!checkBotTokenProvided(botToken)) throw new Error('A bot token was not provided!');

const bot = new Telegraf(botToken);
bot.start((ctx) => ctx.reply('Welcome! Write /need_stand to get a random stand number'));
bot.help((ctx) => ctx.reply('Write /need_stand to get a random stand number'));
bot.command('need_stand', (ctx) => {
  const randomNumber = Math.round(Math.random() * (106 - 1) + 1);
  return ctx.reply(randomNumber.toString());
});
bot.launch();
console.log('Telegram bot is running! 🚀🚀🚀')
