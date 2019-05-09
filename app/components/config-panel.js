import Component from '@ember/component'

var tray

export default Component.extend({
  didInsertElement () {
    const { remote } = window.module.require('electron')
    const openWindow = () => remote.getCurrentWindow().show()

    // Set up tray icon
    tray = new remote.Tray('public/app.ico')
    const trayContextMenu = remote.Menu.buildFromTemplate([
      { labe: 'Open', type: 'normal', click: openWindow },
      { label: 'Close', type: 'normal', click: () => remote.app.quit() }
    ])
    tray.setContextMenu(trayContextMenu)
    tray.setToolTip('15na')
    tray.setTitle('15na')
    tray.on('double-click', openWindow)

    // Connect to socket.io & do it!
  },
  actions: {
    dispAlert () {
      const { remote } = window.module.require('electron')
      var wAlert = new remote.BrowserWindow({
        width: 420,
        height: 500,
        backgroundColor: '#c33',
        show: true,
        frame: false,
        webPreferences: {
          nodeIntegration: true
        }
      })
      // Set properties of window object
      wAlert.setResizable(true)
      if (process.env.15na_MODE === 'dev') {
        console.log('Running in development mode.')
        wAlert.loadURL('http://localhost:4200/alert')
      } else {
        wAlert.loadFile('dist/index.html#/alert')
      }
      // Bind event handlers
      wAlert.once('closed', () => {
        wAlert = null
      })
    },
    tryConnect () {
      // Save elements
      const socketIO = window.module.require('socket.io-client')
      const site = document.getElementById('config-site').value
      const statTitle = document.getElementById('status-title')
      const statLocation = document.getElementById('status-location')
      const statHost = document.getElementById('status-host')
      const statIP = document.getElementById('status-ip')
      const statIcon = document.getElementById('status-icon')
      const confButton = document.getElementById('config-button')
      const confSpinnerCont = document.getElementById('config-spinner-container')
      confSpinnerCont.classList.add('set')
      // Set socket.io features
      const io = socketIO(`https://${site || 'localhost'}/15na-ws/in`)
      io.on('connect_error', () => {
        confSpinnerCont.classList.remove('set')
      })
      io.on('connect_timeout', () => {
        confSpinnerCont.classList.remove('set')
      })
      io.on('connect', () => {
        statTitle.textContent = 'Connected!'
        statLocation.textContent = 'Dummy'
        statHost.textContent = site
        statIP.textContent = 'Dummy'
        statIcon.classList.add('set')
        confButton.classList.remove('uk-button-primary')
        confButton.classList.add('uk-button-danger')
        confButton.textContent = 'Disconnect'
        confSpinnerCont.classList.remove('set')
        io.emit('requestConnext')
      })
      io.on('disconnect', () => {
        statTitle.textContent = 'Disconnected'
        statLocation.textContent = 'Unknown'
        statHost.textContent = 'Not Connected'
        statIP.textContent = ''
        statIcon.classList.remove('set')
        confButton.classList.remove('uk-button-danger')
        confButton.classList.add('uk-button-primary')
        confButton.textContent = 'Connect'
      })
    }
  }
})
