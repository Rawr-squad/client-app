// src/hooks/useAutoStart.ts
import { useState, useEffect } from 'react';

interface AutoStartState {
	isEnabled: boolean;
	isLoading: boolean;
	error: string | null;
	toggleAutoStart: () => Promise<void>;
}

export const useAutoStart = (): AutoStartState => {
	const [isEnabled, setIsEnabled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadAutoStartStatus();
	}, []);

	const loadAutoStartStatus = async () => {
		if (!window.electronAPI) {
			setIsLoading(false);
			return;
		}

		try {
			const status = (await window.electronAPI.getAutoStartStatus()) as boolean;
			setIsEnabled(status);
		} catch (err) {
			setError('Failed to load auto-start status');
			console.error('Auto-start error:', err);
		} finally {
			setIsLoading(false);
		}
	};

	const toggleAutoStart = async () => {
		if (!window.electronAPI) return;

		setIsLoading(true);
		setError(null);

		try {
			const newStatus = !isEnabled;
			await window.electronAPI.setAutoStart(newStatus);
			setIsEnabled(newStatus);
		} catch (err) {
			setError('Failed to update auto-start settings');
			console.error('Auto-start toggle error:', err);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isEnabled,
		isLoading,
		error,
		toggleAutoStart,
	};
};
