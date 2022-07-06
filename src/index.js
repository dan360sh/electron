import { app, BrowserWindow } from 'electron';
import { execFile } from 'child_process';
import regedit from 'regedit';
import puppeteer from 'puppeteer';
import http from 'http';
import { Botrix } from './Botrix.js';

const server = http.createServer();
server.listen(3200, () => console.log('сервер запущен'));
server.on('request', async function (req, res) {
  // if(urlServer[req.url]){
  // 	res.writeHead(200,{'Content-Type': mime.getType(urlServer[req.url])+ "; charset=utf-8"});
  // 	res.end($.html());
  // }else{
  // 	res.writeHead(200,{'Content-Type': mime.getType(req.url)+ "; charset=utf-8"});
  // 	var t =  fs.readFileSync(req.url.slice(1));
  // 	res.end(t);

  // }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.end('hello');
});
const nameFile = 'my-new-project.exe';

async function Start() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://qiwi.com/');
  const bot = new Botrix(browser, page);
  await bot.click('.css-11ncq5h', 2000);
  // await bot.click('css-1njdy62', 2000);
  await bot.inputPress('[name="username"]', '+79602977714', 2000);
  await bot.inputPress('[name="password"]', 'Romabaranov222', 2000);
  await bot.click('[type="submit"]', 2000);
  await page.goto('https://qiwi.com/payment/form/27290?paymentModeType=CARD');
}

Start();
regedit.list(['HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run'], (err, result) => {
  console.log(result);
});
regedit.createKey(['HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\Moo', 'lol.exe'], () => {
  console.log('lol');
});
const valuesToPut = {
  'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run': {
    'myValue2': {
      value: `${__dirname}\\${nameFile}`,
      type: 'REG_SZ'
    }
  }
};
regedit.putValue(valuesToPut, (err) => {
  console.log(err);
});

/**
 * Function to execute exe
 * @param {string} fileName The name of the executable file to run.
 * @param {string[]} params List of string arguments.
 * @param {string} path Current working directory of the child process.
 */
async function execute(fileName, params, path) {
  const promise = new Promise((resolve, reject) => {
    execFile(fileName, params, { cwd: path }, (err, data) => {
      if (err) {
        reject(err);
        console.log('oshibka');
      } else {
        resolve(data);
      }
    });
  });
  return promise;
}

console.log(__dirname);
execute('setup.exe', [], __dirname);
if (require('electron-squirrel-startup')) {
  app.quit();
}
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

