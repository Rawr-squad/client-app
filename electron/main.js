const {
	app,
	BrowserWindow,
	Tray,
	Menu,
	nativeImage,
	ipcMain,
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;
let tray = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 800,
		minHeight: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.js'),
		},
		show: false,
		icon: path.join(__dirname, 'assets/icon.png'), // Add your app icon
	});

	const startUrl = isDev
		? 'http://localhost:3000'
		: `file://${path.join(__dirname, '../dist/index.html')}`;

	mainWindow.loadURL(startUrl);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		if (isDev) {
			mainWindow.webContents.openDevTools();
		}
	});

	mainWindow.on('closed', () => {
		mainWindow = null;
	});

	// Hide window instead of closing when user clicks X
	mainWindow.on('close', (event) => {
		if (!app.isQuitting) {
			event.preventDefault();
			mainWindow.hide();
			return false;
		}
		return true;
	});
}

function createTray() {
	// Create tray icon (you can use a base64 icon or image file)
	const iconPath = path.join(__dirname, 'assets/tray-icon.png');
	let trayIcon = nativeImage.createFromPath(iconPath);

	// Fallback to a simple icon if file doesn't exist
	if (trayIcon.isEmpty()) {
		trayIcon = nativeImage.createFromDataURL(
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
		);
	}

	tray = new Tray(trayIcon);

	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Show App',
			click: () => {
				if (mainWindow) {
					mainWindow.show();
					mainWindow.focus();
				}
			},
		},
		{
			label: 'Lock App',
			click: () => {
				// Send lock command to renderer
				if (mainWindow) {
					mainWindow.webContents.send('lock-app');
				}
			},
		},
		{ type: 'separator' },
		{
			label: 'Auto-start with System',
			type: 'checkbox',
			checked: app.getLoginItemSettings().openAtLogin,
			click: (menuItem) => {
				const settings = app.getLoginItemSettings();
				app.setLoginItemSettings({
					openAtLogin: !settings.openAtLogin,
					path: app.getPath('exe'),
				});
			},
		},
		{ type: 'separator' },
		{
			label: 'Exit',
			click: () => {
				app.isQuitting = true;
				app.quit();
			},
		},
	]);

	tray.setToolTip('Secrets App');
	tray.setContextMenu(contextMenu);

	// Double click to show app
	tray.on('double-click', () => {
		if (mainWindow) {
			mainWindow.show();
			mainWindow.focus();
		}
	});
}

// Auto-start setup
function setupAutoStart() {
	const settings = app.getLoginItemSettings();
	if (!settings.openAtLogin) {
		app.setLoginItemSettings({
			openAtLogin: true,
			path: app.getPath('exe'),
		});
	}
}

app.whenReady().then(() => {
	createWindow();
	createTray();
	// setupAutoStart(); // Uncomment to enable auto-start by default
});

app.on('window-all-closed', () => {
	// Don't quit when all windows are closed (we have tray)
	if (process.platform !== 'darwin') {
		// Keep app running in background with tray
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('before-quit', () => {
	app.isQuitting = true;
});

// IPC handlers for communication with renderer
ipcMain.handle('get-auto-start-status', () => {
	return app.getLoginItemSettings().openAtLogin;
});

ipcMain.handle('set-auto-start', (event, enabled) => {
	app.setLoginItemSettings({
		openAtLogin: enabled,
		path: app.getPath('exe'),
	});
});

ipcMain.handle('lock-app', () => {
	if (mainWindow) {
		mainWindow.webContents.send('lock-app');
	}
});
