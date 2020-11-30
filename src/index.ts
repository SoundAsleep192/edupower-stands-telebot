require('dotenv').config();
import { Telegraf, Stage, session } from 'telegraf';
import { SceneContextMessageUpdate } from 'telegraf/typings/stage';
import { statusScene } from './controllers/status';
import { takeScene } from './controllers/take';
import { users } from './storage';

import { checkBotTokenProvided } from './utils/checkBotTokenProvided';

if (!checkBotTokenProvided(process.env.BOT_TOKEN)) {
  throw new Error('A bot token was not provided!');
}

const bot = new Telegraf<SceneContextMessageUpdate>(process.env.BOT_TOKEN);
const stage = new Stage([statusScene, takeScene], { ttl: 10 });
bot.use(session());
bot.use(stage.middleware());
bot.command('status', (ctx) => ctx.scene.enter('status'));
bot.command('take', (ctx) => ctx.scene.enter('take'));

bot.start((ctx) => {
  const { id, username, first_name, last_name } = ctx.message!.from!;

  users.push({
    id,
    username,
    fullName: first_name + (last_name ? ' ' + last_name : ''),
  });

  return ctx.reply(
    `Привет, ${first_name}! Чтобы посмотреть статус, используй /status\nЧтобы занять стенд, используй /take`
  );
});

bot.launch();
console.log('Telegram bot is running! 🚀🚀🚀');
