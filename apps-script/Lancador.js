/** Google Apps Script: lança despesas na aba do mês. IDs vêm das Script Properties. */
const MESES = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const r = lancarNaPlanilha(d);
  return ContentService.createTextOutput(JSON.stringify(r)).setMimeType(ContentService.MimeType.JSON);
}

function lancarNaPlanilha(d) {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const aba = SpreadsheetApp.openById(id).getSheetByName(MESES[d.mes - 1]);
  const linhas = aba.getDataRange().getValues().slice(1)
    .filter(r => r[0] && r[3] !== '')
    .map(r => ({ dia: new Date(r[0]).getDate(), mes: d.mes, descricao: String(r[2]), valor: Number(r[3]) }));
  const { ok, dup } = separarDuplicados([d], linhas);
  if (dup.length) return { ok: false, motivo: 'duplicado' };
  aba.appendRow([new Date(new Date().getFullYear(), d.mes - 1, d.dia), d.categoria || '', d.descricao, d.valor]);
  return { ok: true };
}

function fechamentoDoDia(mes, dia) {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const linhas = SpreadsheetApp.openById(id).getSheetByName(MESES[mes - 1]).getDataRange().getValues().slice(1);
  const doDia = linhas.filter(r => r[0] instanceof Date && r[0].getDate() === dia);
  return { lancamentos: doDia.length, total: doDia.reduce((s, r) => s + Number(r[3] || 0), 0) };
}
