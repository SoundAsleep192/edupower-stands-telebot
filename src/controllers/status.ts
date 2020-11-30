import { BaseScene, Markup } from 'telegraf';
import { stands } from '../storage';
import { buildStandStatusMessageString } from '../utils/buildStandStatusMessageString';

export const statusScene = new BaseScene('status');

statusScene.enter(
  async (ctx) =>
    await ctx.reply(
      'Какой стенд интересует?',
      Markup.inlineKeyboard(
        stands.map((stand) =>
          Markup.callbackButton(`${stand.id}`, `STATUS_${stand.id}`)
        )
      ).extra()
    )
);

statusScene.action(/^STATUS_[0-9]*$/gi, async (ctx) => {
  const pickedStandId = ctx.callbackQuery?.data?.match(/\d+/)?.[0];
  await ctx.answerCbQuery();

  const pickedStand = stands.find(
    (stand) => stand.id.toString() === pickedStandId
  );

  await ctx.reply(buildStandStatusMessageString(pickedStand!));
  return await ctx.scene.leave();
});

statusScene.leave(
  async (ctx) =>
    await ctx.reply(
      'Чтобы посмотреть статус, используй /status\nЧтобы занять стенд, используй /take'
    )
);
