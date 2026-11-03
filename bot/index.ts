import 'dotenv/config';
import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);
const permitidos = (process.env.ALLOWED_CHAT_IDS || '').split(',');
const WEBAPP = process.env.APPS_SCRIPT_WEBAPP_URL!;

bot.use((ctx, next) => (permitidos.includes(String(ctx.chat?.id)) ? next() : undefined));

// Ex.: "05-10 Material de limpeza 123,45" (legenda do comprovante ou texto)
bot.on(['text', 'document', 'photo'], async (ctx: any) => {
  const txt: string = ctx.message.caption || ctx.message.text || ctx.message.document?.file_name || '';
  const m = txt.match(/^(\d{1,2})[-/](\d{1,2})\s+(.+?)\s+([\d.,]+)/);
  if (!m) return ctx.reply('Formato: DD-MM descrição valor');
  const body = { dia: +m[1], mes: +m[2], descricao: m[3], valor: Number(m[4].replace(/\./g, '').replace(',', '.')) };
  const r = await fetch(WEBAPP, { method: 'POST', body: JSON.stringify(body) }).then(x => x.json());
  ctx.reply(r.ok ? '✅ Lançado' : `⚠️ Não lançado: ${r.motivo}`);
});

bot.launch();
