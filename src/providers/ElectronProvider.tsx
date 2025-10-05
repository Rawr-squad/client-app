// src/components/ElectronProvider.tsx
import { useEffect } from 'react';
import { useMasterPasswordStore } from '../store/masterPasswordStore';

export const ElectronProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const lockMasterPassword = useMasterPasswordStore((state) => state.lock);

	useEffect(() => {
		const handleLockApp = () => {
			lockMasterPassword();
		};

		if (window.electronAPI) {
			window.electronAPI.onLockApp(handleLockApp);
		}

		// return () => {
		// 	if (window.electronAPI) {
		// 		window.electronAPI.removeAllListeners('lock-app');
		// 	}
		// };
	}, [lockMasterPassword]);

	return <>{children}</>;
};
