/** Interpreta nomes de arquivo no padrão "DD-MM descricao valor.ext". */
function removerAcentos(s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

function converterValor(txt) {
  const t = String(txt).replace(/[^\d,.-]/g, '');
  const n = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t;
  const v = Number(n);
  return Number.isFinite(v) ? Math.round(v * 100) / 100 : null;
}

function extrairDadosDoNome(nome) {
  const base = String(nome).replace(/\.[a-z0-9]+$/i, '').trim();
  const m = base.match(/^(\d{1,2})[-_.](\d{1,2})\s+(.+?)\s+(?:R\$\s*)?([\d.,]+)$/i);
  if (!m) return null;
  return { dia: +m[1], mes: +m[2], descricao: m[3].replace(/\s+/g, ' ').trim(), valor: converterValor(m[4]) };
}

function chaveDuplicidade(d) {
  return [d.dia, d.mes, removerAcentos(d.descricao).toLowerCase().replace(/[^a-z0-9]/g, ''), d.valor.toFixed(2)].join('|');
}

/** Retorna os lançamentos novos e os duplicados em relação aos já existentes. */
function separarDuplicados(novos, existentes) {
  const vistos = new Set(existentes.map(chaveDuplicidade));
  const ok = [], dup = [];
  for (const d of novos) { const k = chaveDuplicidade(d); (vistos.has(k) ? dup : ok).push(d); vistos.add(k); }
  return { ok, dup };
}

if (typeof module !== 'undefined') module.exports = { extrairDadosDoNome, converterValor, chaveDuplicidade, separarDuplicados };
