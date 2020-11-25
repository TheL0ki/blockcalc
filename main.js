const electron  = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcRenderer} = electron;


// Listen for app to be ready
app.on('ready', function() {
  // Create BrowserWindow
  const mainWindow = new BrowserWindow({
    width: 290,
    height: 360,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });;
    // Load HTML into Window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slahes: true
    }));

    // Build menue from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

// Create menu template

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: ''
      },
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

if(process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'DevTools',
    submenu:[
      {
        label: 'Toggle console',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      },
      {
        label: 'Restart App',
        accelerator: process.platform == 'darwin' ? 'Command+E' : 'Ctrl+E',
        click () {
          app.relaunch();
          app.quit();
        }
      }
    ]
  })
}
