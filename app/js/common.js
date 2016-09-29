const electron  = require('electron');
const shell         = electron.shell;
const ipcRenderer   = electron.ipcRenderer;
window.jquery       = window.jQuery = window.$ = require('jquery');
window.Hammer       = Hammer = require('./lib/hammer.js');