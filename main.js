const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require('fs')
const isPackaged = require('electron-is-packaged')
const appPath = `${__dirname}/`

// Create .env file before initialize Strapi, to prevent Crash
fs.copyFileSync(`${appPath}.env` , `.env`)

const Strapi = require('@strapi/strapi')

// Behavior:
// * - `appDir` is the directory where Strapi will write every file (schemas, generated APIs, controllers or services)
// * - `distDir` is the directory where Strapi will read configurations, schemas and any compiled code
const strapi = Strapi({
    appDir: appPath,
    distDir: appPath
})


if (isPackaged) {
    const requiredFolderPaths = {
        database: path.join(appPath, 'database'),
        public: path.join(appPath, 'public'),
        uploads: path.join(appPath, 'public', 'uploads'),
    }

    Object.values(requiredFolderPaths).forEach((folderPath) => {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { 
                recursive: true 
            })

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
            nodeIntegration: true
        }
    })

    win.webContents.openDevTools()

    strapi
        .start()
        .then(() => {
            win.loadFile('index.html')
        })
        .catch((err) => {
            console.error(err)
        })

    win.on('closed', () => {
        app.quit()
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
