import { Telegraf } from 'telegraf';

import { checkBotTokenProvided } from './utils/checkBotTokenProvided';
import {config} from 'dotenv';
config();

const botToken = process.env.BOT_TOKEN;

if (!checkBotTokenProvided(botToken)) throw new Error('A bot token was not provided!');

const bot = new Telegraf(botToken);
bot.start((ctx) => ctx.reply('Welcome! Write /need_stand to get a random stand number'));
bot.help((ctx) => ctx.reply('Write /need_stand to get a random stand number'));
bot.command('need_stand', (ctx) => {
  const randomNumber = Math.round(Math.random() * (106 - 1) + 1);
  return ctx.reply(randomNumber.toString());
});
bot.launch();
console.log('Telegram bot is running! 🚀🚀🚀');
