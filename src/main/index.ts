import { app, shell, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

let mainWindow;
let tray; // tray variable

function createWindow(): void {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: icon,
    show: false,
    frame: false,
    transparent: false,
    autoHideMenuBar: true,
    minWidth: 550,
    minHeight: 400,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  let intervalId;

  intervalId = setInterval(() => {
    if (mainWindow.isMaximized()) {
      mainWindow.webContents.send('maximized', true);
    } else {
      mainWindow.webContents.send('maximized', false);
    }
  }, 1);

  // Create the system tray icon
  let trayIcon = icon;
  if (!is.dev) {
    trayIcon = join(process.resourcesPath, 'icon.png');
  }

  try {
    tray = new Tray(trayIcon);
    tray.setToolTip('DeepSeek Developer Desktop');

    tray.on('click', () => {
      if (mainWindow) {
        mainWindow.show();
      }
    });
    // Create a tray right-click menu
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'quit',
        click: () => {
          app.quit();
        }
      }
    ]);

    // Set the tray right-click menu
    tray.setContextMenu(contextMenu);
  } catch (error) {
    console.error('tray fail:', error);
  }

  mainWindow.on('closed', () => {
    clearInterval(intervalId);
    intervalId = null;
    // Clean tray icon
    if (tray) {
      tray.destroy()
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Singleton lock check
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // focus on the window of the first instance
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.show();
      mainWindow.focus();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    ipcMain.handle('reload', () => {
      if (mainWindow) {
        mainWindow.reload(); // reload
      }
    });

    ipcMain.handle('exit', () => {
      if (mainWindow) {
        app.quit(); // quit
      }
    });

    ipcMain.handle('close', () => {
      if (mainWindow) {
        mainWindow.hide() // hide window
      }
    });

    ipcMain.handle('maximize', () => {
      if (mainWindow) {
        mainWindow.maximize(); // maximize
      }
    });

    ipcMain.handle('restore', () => {
      if (mainWindow) {
        mainWindow.restore(); // maximize
      }
    });

    ipcMain.handle('minimize', () => {
      if (mainWindow) {
        mainWindow.minimize(); // minimize
      }
    });

    ipcMain.handle('external-url', async (_event, url) => {
      await shell.openExternal(url)
    })

    // Test creating docker container
    ipcMain.handle('run-docker-test', () => {
      const { spawn } = require('child_process');
      const command = 'docker';
      const args = [
        'run',
        '--runtime=nvidia',
        '--gpus', 'all',
        '--name', 'DeepSeek-Deployment-Webui',
        '-v', `${process.env.USERPROFILE}/.cache/huggingface:/root/.cache/huggingface`,
        '-v', 'deepseek-model-volume:/deepseek-ai',
        '-p', '1229:8000',
        '--ipc=host',
        'vllm/vllm-openai:latest',
        '--model', '/deepseek-ai/DeepSeek-R1-Distill-Qwen-1.5B',
        '--gpu_memory_utilization', '1.0',
        '--max_model_len', '8192'
      ];

      const child = spawn(command, args);

      child.stdout.on('data', (data) => {
        mainWindow.webContents.send('docker-run-info', data.toString());
      });

      child.stderr.on('data', (data) => {
        mainWindow.webContents.send('docker-run-info', data.toString());
        if (data.toString().includes('Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)')) {
          console.log('ok');
        }
      });

      child.on('close', (code) => {
        console.log(`exit code ${code}`);
      });
    });

    ipcMain.handle('get-graphics-info', async () => {
      const si = require('systeminformation');
      try {
        const graphics = await si.graphics();
        const graphicsInfo = graphics.controllers.map((controller) => ({
          model: controller.model,
          vram: controller.vram,
        }));
        // Returns a JSON list of graphics card information
        return graphicsInfo;
      } catch (error) {
        console.error('Error fetching graphics information:', error);
        return undefined;
      }
    })

    ipcMain.handle('get-cuda-info', async () => {
      const { exec } = require('child_process');
      return new Promise((resolve, _reject) => {
        exec('nvidia-smi', (error, stdout, stderr) => {
          if (error || stderr) {
            console.error('Error executing nvidia-smi:', error);
            return resolve(undefined); // undefined
          }
          const lines = stdout.trim().split('\n');
          const cudaLine = lines.find(line => line.includes('CUDA Version:')); // Find the row that contains the CUDA version
          const cudaVersion = cudaLine ? cudaLine.split('CUDA Version:')[1].trim().match(/^\d+(\.\d+)?/)?.[0] : undefined; // Extract the CUDA version
          resolve(cudaVersion);
        });
      });
    })

    ipcMain.handle('get-docker-info', async () => {
      const { exec } = require('child_process');
      return new Promise((resolve, _reject) => {
        exec('docker --version', (error, stdout, stderr) => {
          if (error || stderr) {
            console.error('Error executing docker --version:', error);
            return resolve(undefined); // undefined
          }
          const lines = stdout.trim().split('\n');
          const dockerLine = lines.find(line => line.includes('Docker version'));
          const dockerVersion = dockerLine ? dockerLine.split('Docker version')[1].trim().split(',')[0] : undefined;
          resolve(dockerVersion);
        });
      });
    })

    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})