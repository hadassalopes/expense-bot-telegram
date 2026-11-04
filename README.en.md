# Expense and cash-closing bot (Telegram + Google Sheets)

🇧🇷 [Português](README.md)

> Portfolio project. Code adapted from a real automation in production; **all data, names, IDs and amounts are fictitious**.

## Problem
Expense receipts arrived scattered (photos, PDFs) and were typed by hand into the monthly spreadsheet, with risk of duplicate entries and a slow cash closing.

## Solution
- A Telegram bot receives the receipt and its data (date, description, amount).
- The file name follows a pattern (`DD-MM description amount.pdf`) and is parsed automatically.
- Google Apps Script writes the entry into the month's tab, inside the day's block, and recalculates subtotals.
- Duplicate detection by normalized key (date + accent-free description + amount).
- A cash-closing command produces the summary from the phone.

## Result
Expense entry and cash closing done from the phone, with duplicate-receipt detection. Part of a set of more than 10 automations in production.

## Stack
Google Apps Script, Node.js/TypeScript, Telegram Bot API, Google Sheets, Google Drive, AI (development support)

## How to run
1. `cp .env.example .env` and fill it in.
2. `npm install && npm start` (bot).
3. Copy `apps-script/*.js` into an Apps Script project bound to the demo spreadsheet (`demo/despesas_demo.csv`).
4. Tests: `node --test apps-script/`.

## Author
Hadassa Lopes — [LinkedIn](https://www.linkedin.com/in/kesia-hadassa-vieira)
