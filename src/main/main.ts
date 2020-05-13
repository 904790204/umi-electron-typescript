import * as path from 'path';
import * as url from 'url';
import { app, BrowserWindow } from 'electron';
import setApplicationMenu from './utils/menu';
import UserStore from './core/UserStore';

let mainWindow: Electron.BrowserWindow | null;
declare global {
  namespace NodeJS {
    interface Global {
      store: any;
    }
  }
}
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 1200,
  });

  setApplicationMenu();

  global.title = 'Yay! Welcome to umi-electron-typescript!';
  global.store = new UserStore();

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8000/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, './dist/renderer/index.html'),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

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
