const { GoogleSpreadsheet } = require('google-spreadsheet');

const fs = require('fs');

const RESPONSES_SHEET_ID = '1jnb2wjF4dYHFDkvEwL53HeXiXPLa90bkiJ_xhXC1un0';

const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

const CREDENTIALS = JSON.parse(fs.readFileSync('./credentials.json'));

const getRow = async (email) => {

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row.email == email) {
            console.log(row.user_name);
            console.log(row.password);
        }
    };
};

//getRow('TMS');

const addRow = async (rows) => {

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        await sheet.addRow(row);
    }
};

let rows = [{
    email: 'email@email.com',
    user_name: 'ramesh',
    password: 'abcd@1234'
}, {
    email: 'email@gmail.com',
    user_name: 'dilip',
    password: 'abcd@1234'
}];

//addRow(rows);

const updateRow = async (keyValue, oldValue, newValue) => {

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row[keyValue] === oldValue) {
            rows[index][keyValue] = newValue;
            await rows[index].save();
            break; 
        }
    };
};

updateRow('user_name', 'vogadok', 'dev')

const deleteRow = async (keyValue, thisValue) => {

    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();

    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        if (row[keyValue] === thisValue) {
            await rows[index].delete();
            break; 
        }
    };
};

//deleteRow('email', 'ramesh@ramesh.com')