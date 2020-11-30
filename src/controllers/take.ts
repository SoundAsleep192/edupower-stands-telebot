import { BaseScene, Markup } from 'telegraf';
import { stands, users } from '../storage';

export const takeScene = new BaseScene('take');

takeScene.enter(async (ctx) => {
  const freeStands = stands.filter((stand) => stand.users.length === 0);

  if (freeStands.length === 0) {
    await ctx.reply('В настоящий момент свободных стендов нет 😞');
    return await ctx.scene.leave();
  }

  return ctx.reply(
    'Выбери один из свободных стендов',
    Markup.inlineKeyboard(
      freeStands.map((stand) =>
        Markup.callbackButton(`${stand.id}`, `TAKE_${stand.id}`)
      )
    ).extra()
  );
});

takeScene.action(/^TAKE_[0-9]*$/gi, async (ctx) => {
  const pickedStandId = ctx.callbackQuery?.data?.match(/\d+/)?.[0];
  await ctx.answerCbQuery();

  const pickedStand = stands.find(
    (stand) => stand.id.toString() === pickedStandId
  );

  pickedStand?.users.push(users.find((user) => user.id === ctx.from?.id)!);

  await ctx.reply(
    `Поздравляю, ${ctx.from?.first_name}, стенд ${pickedStandId} теперь твой!`
  );
  return await ctx.scene.leave();
});

takeScene.leave(
  async (ctx) =>
    await ctx.reply(
      'Чтобы посмотреть статус, используй /status\nЧтобы занять стенд, используй /take'
    )
);
