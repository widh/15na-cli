import Component from '@ember/component'

export default Component.extend({
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
