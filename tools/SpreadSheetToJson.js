/*
 * 参考
 * http://qiita.com/daikiojm/items/b7998c94b174f474d13f
 */

const GoogleSpreadsheet = require('google-spreadsheet');
const fs = require('fs-extra');
const path = require('path');

const conf = require('./config');
const credential = require('./serviceAccountKey.json');

const result = {};
const sheetHandler = new GoogleSpreadsheet(conf.spreadsheet.id);

sheetHandler.useServiceAccountAuth(credential, useServiceAccountAuthCallback);

function useServiceAccountAuthCallback (authError) {
  console.log('---Auth start---');
  if (authError) {
    throw authError;
  }

  console.log('---Auth OK---');
  sheetHandler.getInfo(getSheetInfo);
}

function getSheetInfo (getSheetInfoError, { worksheets }) {
  if (getSheetInfoError) {
    throw getSheetInfoError;
  }

  worksheets.forEach(parseWorksheet);
}

function parseWorksheet ({ title, getRows }) {
  const info = conf.spreadsheet.sheets.find(({ sheetTitle }) => title === sheetTitle);
  if (info) {
    getRows((getRowsError, rows) => parseSheet(getRowsError, rows, info));
  }
}

function parseSheet (getRowsError, rows, worksheetInfo) {
  if (getRowsError) {
    throw getRowsError;
  }

  result[worksheetInfo.key] = rows.map(row => worksheetInfo.rows
    .filter(([key]) => typeof row[key] !== 'undefined')
    .reduce((parseRow, [key, systemKey]) => {
      parseRow[systemKey] = row[key].trim();
      return parseRow;
    }, {})
  );

  console.log('parsed:', worksheetInfo.key);

  outputResult();
}

function outputResult () {
  if (Object.keys(conf.spreadsheet.sheets).length === Object.keys(result).length) {
    fs.writeFileSync(path.join(__dirname, '..', conf.spreadsheet.output), JSON.stringify(result));
    console.log('Write finish!');
  }
}
