import Component from '@ember/component'

export default Component.extend({
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
      if (process.env.SYAA_MODE === 'dev') {
        console.log('Running in development mode.')
        wAlert.loadURL('http://localhost:4200/alert')
      } else {
        wAlert.loadFile('dist/index.html#/alert')
      }
      // Bind event handlers
      wAlert.once('closed', () => {
        wAlert = null
      })
    }
  }
})
