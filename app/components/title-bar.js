import Component from '@ember/component'

export default Component.extend({
  actions: {
    minWindow () {
      const { remote } = window.module.require('electron')
      remote.BrowserWindow.getFocusedWindow().minimize()
    },
    closeWindow () {
      const { remote } = window.module.require('electron')
      remote.BrowserWindow.getFocusedWindow().hide()
    }
  }
})
