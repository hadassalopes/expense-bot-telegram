# Bot de despesas e fechamento de caixa (Telegram + Google Sheets)

🇺🇸 [English version](README.en.md)

> Projeto de portfólio. Código adaptado de uma automação real em produção; **todos os dados, nomes, IDs e valores são fictícios**.

## Problema
Comprovantes de despesas chegavam soltos (fotos, PDFs) e eram lançados à mão na planilha do mês, com risco de lançamento em duplicidade e fechamento de caixa demorado.

## Solução
- Bot no Telegram recebe o comprovante e os dados (data, descrição, valor).
- O nome do arquivo segue um padrão (`DD-MM descricao valor.pdf`) e é interpretado automaticamente.
- Google Apps Script lança na aba do mês, dentro do bloco do dia, e recalcula subtotais.
- Detecção de duplicidade por chave normalizada (data + descrição sem acentos + valor).
- Comando de fechamento de caixa gera o resumo pelo celular.

## Resultado
Lançamento de despesas e fechamento de caixa feitos pelo celular, com detecção de comprovantes duplicados. Faz parte de um conjunto de mais de 10 automações em produção.

## Stack
Google Apps Script, Node.js/TypeScript, Telegram Bot API, Google Sheets, Google Drive, IA (apoio no desenvolvimento)

## Como rodar
1. `cp .env.example .env` e preencha.
2. `npm install && npm start` (bot).
3. Copie `apps-script/*.js` para um projeto Apps Script ligado à planilha demo (`demo/despesas_demo.csv`).
4. Testes: `node --test apps-script/`.

## Autora
Hadassa Lopes — [LinkedIn](https://www.linkedin.com/in/kesia-hadassa-vieira)
