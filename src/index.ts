import { Telegraf, Markup } from 'telegraf';

import { checkBotTokenProvided } from './utils/checkBotTokenProvided';
import {config} from 'dotenv';
config();

// Token check
const botToken = process.env.BOT_TOKEN;

if (!checkBotTokenProvided(botToken)) throw new Error('A bot token was not provided!');

// Bot setup
const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply('Hello! Please, introduce yourself'));
bot.help((ctx) => ctx.reply('Write /need_stand to get a random stand number'));

bot.command('need_stand', (ctx) => {
  const randomNumber = Math.round(Math.random() * (106 - 1) + 1);
  return ctx.reply(`You can take stand №${randomNumber}`);
});

bot.command('take', ({ reply }) => {
  return  reply('Which stand you wanna take?', Markup
  .keyboard(['31', '32', '/take_33'])
  .oneTime()
  .resize()
  .extra()
  );
});

bot.launch();
console.log('Telegram bot is running! 🚀🚀🚀');
