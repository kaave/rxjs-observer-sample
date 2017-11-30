/*
 * 参考
 * http://qiita.com/daikiojm/items/b7998c94b174f474d13f
 */

const GoogleSpreadsheet = require('google-spreadsheet');
const fs = require('fs-extra');
const path = require('path');

const conf = require('./config');

const result = {};
const sheetHandler = new GoogleSpreadsheet(conf.spreadsheet.id);

sheetHandler.useServiceAccountAuth(conf.spreadsheet.credential, useServiceAccountAuthCallback);

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
  if (title === conf.spreadsheet.titles.sales.title) {
    getRows(parseSalesSheet);
  }
}

function parseSalesSheet (getRowsError, rows) {
  if (getRowsError) {
    throw getRowsError;
  }

  console.log('---Sales parse start---');
  result.sales = rows.map(row => {
    return conf.spreadsheet.titles.sales.cells
      .filter(([key]) => typeof row[key] !== 'undefined')
      .reduce((parseRow, [key, type, systemKey]) => {
        parseRow[systemKey] = row[key].trim();
        return parseRow;
      }, {});
  });

  console.log('---Sales parse end---');
  outputResult()
}

function outputResult () {
  fs.writeFileSync(path.join(__dirname, '..', conf.spreadsheet.path), JSON.stringify(result));
}
