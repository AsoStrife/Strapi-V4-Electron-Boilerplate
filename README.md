# Strapi-V4-Electron-Boilerplate
- [Strapi-V4-Electron-Boilerplate](#strapi-v4-electron-boilerplate)
  * [To Use](#to-use)
  * [Scripts](#scripts)
  * [Better Sqlite3 Build problem](#better-sqlite3-build-problem)

**Clone and run for a quick way to see Electron + Strapi v4 in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/latest/tutorial/quick-start) within the Electron documentation with a [Strapi v4 CMS](https://strapi.io/) integrated.

This Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/AsoStrife/Strapi-V4-Electron-Boilerplate
# Go into the repository
cd Strapi-V4-Electron-Boilerplate
# Install dependencies
npm i
# Run the app
npm run electron
```

## Scripts

- `strapi-start`:  run Strapi vanilla, without electron 

- `strapi-develop`: run Strapi vanilla in develop mode, without electron 

- `strapi-build`: build strapi UI

- `electron`: run Strapi with Electron

- `electron-build`: build Electron with Strapi. It produce a `.exe` if you're on windows

- `build`: build Strapi UI + Electron

## Better Sqlite3 Build problem 

If you run `npm run electron-build` you may run into the following error:

```bash
better_sqlite3.node was compiled against a different Node.js version using
NODE_MODULE_VERSION 93. This version of Node.js requires
NODE_MODULE_VERSION 106. Please try re-compiling or re-installing
```

To fix this problem you can simply go the following page [Releases · WiseLibs/better-sqlite3 (github.com)](https://github.com/WiseLibs/better-sqlite3/releases), find the correct build version you need and paste the `better_sqlite3.node` into `/node_modules/better-sqlite3/build/Release`.

In my case, using windows and `NODE_MODULE_VERSION 106` I downloaded the following file: `better-sqlite3-v7.6.2-electron-v106-win32-x64.tar.gz`
