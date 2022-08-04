const { app, BrowserWindow } = require('electron')
const path = require('path')
const Strapi = require('@strapi/strapi')
const isPackaged = require('electron-is-packaged')

const strapi = Strapi({
    appDir: `${__dirname}/`,
})


if (isPackaged) {
    const fs = require('fs')
    const path = require('path')
  
    const requiredFolderPaths = {
        database: path.join(`${__dirname}/`, 'database'),
        public: path.join(`${__dirname}/`, 'public'),
        uploads: path.join(`${__dirname}/`, 'public', 'uploads'),
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

    win.webContents.openDevTools()
    
    strapi
        .start()
        .then(() => {
            //win.loadURL('http://localhost:1337/admin');
            win.loadFile('index.html')
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
