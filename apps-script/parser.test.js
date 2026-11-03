const test = require('node:test'); const assert = require('node:assert');
const p = require('./parser.js');
test('extrai dados do nome', () => {
  assert.deepStrictEqual(p.extrairDadosDoNome('05-10 Material de limpeza 123,45.pdf'), { dia: 5, mes: 10, descricao: 'Material de limpeza', valor: 123.45 });
});
test('detecta duplicado ignorando acentos', () => {
  const a = { dia: 1, mes: 2, descricao: 'Manutenção', valor: 10 }, b = { dia: 1, mes: 2, descricao: 'manutencao', valor: 10 };
  assert.strictEqual(p.separarDuplicados([b], [a]).dup.length, 1);
});
