interface Window {
	electronAPI?: {
		onLockApp: (callback: () => void) => void;
		removeAllListeners: (channel: string) => void;
		getAutoStartStatus(): unknown;
		setAutoStart(enabled: boolean): unknown;
		getAppVersion: () => Promise<string>;
		getPlatform: () => Promise<string>;
		minimizeWindow: () => Promise<void>;
		maximizeWindow: () => Promise<void>;
		closeWindow: () => Promise<void>;
	};
}

// For process type checking
interface Process {
	type?: 'renderer' | 'browser';
}

interface Window {
	process?: Process;
}
