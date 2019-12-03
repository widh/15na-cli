/* IRONA Client Program is subject to the terms of the Mozilla Public License 2.0.
 * You can obtain a copy of MPL at LICENSE.md of root directory. */

const fs = require('fs');
const path = require('path');
const { app, nativeTheme, BrowserWindow } = require('electron');

let mainWindow;
const createWindow = () => {
  // Create
  mainWindow = new BrowserWindow({
    width: 440,
    minWidth: 400,
    height: 500,
    minHeight: 420,
    show: false,
    frame: false,
    resizable: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#2b2b2b' : '#fff',
    icon: path.join(__dirname, '15na.png'),
    webPreferences: { nodeIntegration: true },
  });

  // Load page
  if (process.env.IRONA_MODE === 'dev') {
    console.log('Running IRONA Client in development mode.');
    const packageInfo = fs.readFileSync('./package.json').toString();
    const port = JSON.parse(packageInfo).devPort;
    mainWindow.loadURL(`http://localhost:${port}/index.html`).then(() => {
      mainWindow.webContents.executeJavaScript(`IRONA.setDevPort(${port});`);
    });
  } else {
    mainWindow.loadFile('public/index.html');
  }

  // Bind events
  mainWindow.once('closed', () => {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.on('focus', () => {
    mainWindow.webContents.executeJavaScript('IRONA.setFocus(true);');
  });
  mainWindow.on('blur', () => {
    mainWindow.webContents.executeJavaScript('IRONA.setFocus(false);');
  });
};

// Load application
app.setAppUserModelId('wldh.IRONA');
app.setAsDefaultProtocolClient('irona');
app.on('ready', createWindow);
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
