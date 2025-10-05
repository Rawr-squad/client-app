// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
	// Auto-start methods
	getAutoStartStatus: () => ipcRenderer.invoke('get-auto-start-status'),
	setAutoStart: (enabled) => ipcRenderer.invoke('set-auto-start', enabled),

	// Lock app method
	lockApp: () => ipcRenderer.invoke('lock-app'),
	onLockApp: (callback) => ipcRenderer.on('lock-app', callback),
	removeLockAppListener: () => ipcRenderer.removeAllListeners('lock-app'),
});
