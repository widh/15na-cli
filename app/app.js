import Application from '@ember/application'
import Resolver from './resolver'
import loadInitializers from 'ember-load-initializers'
import config from './config/environment'

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
  didInsertElement () {
    const { remote } = window.module.require('electron')
    const openWindow = () => remote.getCurrentWindow().show()

    // Set up tray icon
    const tray = new remote.Tray('public/app.ico')
    const trayContextMenu = remote.Menu.buildFromTemplate([
      { label: 'Open', type: 'normal', click: openWindow },
      { label: 'Close', type: 'normal', click: () => remote.app.quit() }
    ])
    tray.setContextMenu(trayContextMenu)
    tray.setToolTip('Syaa')
    tray.setTitle('Syaa')
    tray.on('double-click', openWindow)

    // Connect to socket.io & do it!
  }
})

loadInitializers(App, config.modulePrefix)

export default App
