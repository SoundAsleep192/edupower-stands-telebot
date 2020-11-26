import { Telegraf } from 'telegraf';

import { Sequelize } from 'sequelize';

import { checkBotTokenProvided } from './utils/checkBotTokenProvided';
import {config} from 'dotenv';
config();

const botToken = process.env.BOT_TOKEN;

if (!checkBotTokenProvided(botToken)) throw new Error('A bot token was not provided!');

const sequelize = new Sequelize('stand_telebot_development', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres'
});
sequelize.authenticate()
  .then(() => console.log('Database connection has been established successfully.'))
  .catch((error: Error) => console.error('Unable to connect to the database:', error));


const bot = new Telegraf(botToken);
bot.start((ctx) => ctx.reply('Welcome! Write /need_stand to get a random stand number'));
bot.help((ctx) => ctx.reply('Write /need_stand to get a random stand number'));
bot.command('need_stand', (ctx) => {
  const randomNumber = Math.round(Math.random() * (106 - 1) + 1);
  return ctx.reply(`You can take stand №${randomNumber}`);
});
bot.launch();
console.log('Telegram bot is running! 🚀🚀🚀');
