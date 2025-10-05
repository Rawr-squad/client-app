// src/components/ProtectedSecretsRoute.tsx
import React, { useEffect, useState } from 'react';
import { useMasterPasswordStore } from '../store/masterPasswordStore';
import { MasterPasswordModal } from './MasterPasswordModal';
import { SetupMasterPasswordModal } from './SetupMasterPasswordModal';

interface ProtectedSecretsRouteProps {
	children: React.ReactNode;
}

export const ProtectedSecretsRoute: React.FC<ProtectedSecretsRouteProps> = ({
	children,
}) => {
	const [showMasterPassword, setShowMasterPassword] = useState(false);
	const [showSetupPassword, setShowSetupPassword] = useState(false);
	const { checkLock, passwordHash, lastUnlockTime } = useMasterPasswordStore();

	useEffect(() => {
		const isUnlocked = checkLock();

		// If no password is set, show setup modal
		if (!passwordHash) {
			setShowSetupPassword(true);
			setShowMasterPassword(false);
		}
		// If password is set but not unlocked, show unlock modal
		else if (!isUnlocked) {
			setShowMasterPassword(true);
			setShowSetupPassword(false);
		}
		// If unlocked, show content
		else {
			setShowMasterPassword(false);
			setShowSetupPassword(false);
		}
	}, [checkLock, lastUnlockTime, passwordHash]);

	const handleUnlockSuccess = () => {
		setShowMasterPassword(false);
	};

	const handleSetupSuccess = () => {
		setShowSetupPassword(false);
	};

	const handleSetupRequired = () => {
		setShowMasterPassword(false);
		setShowSetupPassword(true);
	};

	if (showSetupPassword) {
		return (
			<SetupMasterPasswordModal
				isOpen={showSetupPassword}
				onSuccess={handleSetupSuccess}
			/>
		);
	}

	if (showMasterPassword) {
		return (
			<MasterPasswordModal
				isOpen={showMasterPassword}
				onSuccess={handleUnlockSuccess}
				onSetupRequired={handleSetupRequired}
			/>
		);
	}

	return <>{children}</>;
};
