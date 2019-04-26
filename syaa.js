// Widh Jio
const { app, BrowserWindow } = require('electron')

// Keep this as a global reference to avoid garbage collecting of this
let wMain

// Launch main window
const startMain = async () => {
  // Create window object
  wMain = new BrowserWindow({
    width: 768,
    height: 400,
    backgroundColor: '#222',
    show: false,
    frame: false,
    icon: 'public/app.ico',
    webPreferences: {
      nodeIntegration: true
    }
  })
  // Set properties of window object
  wMain.setResizable(true)
  if (process.env.SYAA_MODE === 'dev') {
    console.log('Running in development mode.')
    wMain.loadURL('http://localhost:4200/')
  } else {
    wMain.loadFile('dist/index.html')
  }
  // Bind event handlers
  wMain.once('closed', () => {
    wMain = null
  })
  wMain.once('ready-to-show', () => {
    wMain.show()
  })
}

// For windows alarm
app.setAppUserModelId('widh.syaa')
app.setAsDefaultProtocolClient('syaa')
app.on('ready', startMain)

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (wMain === null) startMain()
})
