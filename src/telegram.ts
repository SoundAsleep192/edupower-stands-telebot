import { Telegram } from 'telegraf';
import { checkBotTokenProvided } from './utils/checkBotTokenProvided';

if (!checkBotTokenProvided(process.env.BOT_TOKEN)) {
  throw new Error('A bot token was not provided!');
}

const telegram = new Telegram(process.env.BOT_TOKEN);
export default telegram;
