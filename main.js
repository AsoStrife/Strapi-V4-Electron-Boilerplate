const { app, BrowserWindow } = require('electron')
const path = require('path')
const Strapi = require('@strapi/strapi')
const isPackaged = require('electron-is-packaged')
const strapi = Strapi()

if (isPackaged) {
    const fs = require('fs')
    const path = require('path')
  
    const appPath = path.join(app.getPath('home'), app.getName())
  
    const requiredFolderPaths = {
        database: path.join(appPath, 'database'),
        public: path.join(appPath, 'public'),
        uploads: path.join(appPath, 'public', 'uploads'),
    }
  
    Object.values(requiredFolderPaths).forEach((folderPath) => {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
    })
}

process.env.NODE_ENV = isPackaged ? 'production' : 'development';
process.env.BROWSER = 'none';

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.maximize()
    win.webContents.openDevTools()
    strapi
        .start()
        .then(() => {
            win.loadURL('http://localhost:1337/admin');
            //win.loadFile('index.html')
        })
        .catch((err) => {
            console.error(err)
        })

        win.on('closed', () => {
            app.quit();
        })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
