const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const RESPONSES_SHEET_ID = '1jnb2wjF4dYHFDkvEwL53HeXiXPLa90bkiJ_xhXC1un0';
const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);
const CREDENTIALS = JSON.parse(fs.readFileSync('public/credentials.json'));
const express = require('express');
const port = 3000

const app = express();

// var bodyParser = require('body-parser')
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
// extended: true
// })); 

app.use(express.static('public'));
//app.use(express.static(path.join('./public', 'script')));

app.set('views', 'views');
app.set('view engine', 'ejs');
// start the express web server listening on 8080s
app.listen(port, () => console.info(`App listening on port ${port}`));

//de primeira ele roda essa pagina pra mostrar o form
app.get('', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.render('home', {text : 'this is a test'});
});
app.post('/addRow', (req, res) => {
    addRow(createRow(req.body.email, req.body.projeto, req.body.descricao));

    //TODO, description no needed
    let err = false;
    if (err) {
        res.render('error', {success: true});
    } else {
        res.render('success', {success: true});
    }
});

const createRow = (email, projeto, descricao) => ([{email: email, projeto: projeto, descricao: descricao}]);

//funcao para buscar dados da planilha
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

//updateRow('user_name', 'vogadok', 'dev')

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

//deleteRow('user_name', 'dev')