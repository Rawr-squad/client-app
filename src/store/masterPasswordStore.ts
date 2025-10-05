// src/store/masterPasswordStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

interface MasterPasswordState {
	isUnlocked: boolean;
	lastUnlockTime: number | null;
	unlockDuration: number;
	passwordHash: string | null;
	isInitialized: boolean;

	unlock: (password: string) => Promise<boolean>;
	lock: () => void;
	checkLock: () => boolean;
	setUnlockDuration: (duration: number) => void;
	setMasterPassword: (
		currentPassword: string | null,
		newPassword: string
	) => Promise<boolean>;
	verifyCurrentPassword: (password: string) => Promise<boolean>;
	initializeMasterPassword: (password: string) => Promise<boolean>;
}

export const useMasterPasswordStore = create<MasterPasswordState>()(
	persist(
		(set, get) => ({
			isUnlocked: false,
			lastUnlockTime: null,
			unlockDuration: 30 * 60 * 1000, // 30 minutes default
			passwordHash: null,
			isInitialized: false,

			unlock: async (password: string): Promise<boolean> => {
				const { passwordHash, verifyCurrentPassword } = get();

				if (!passwordHash) {
					set({ isUnlocked: true, lastUnlockTime: Date.now() });
					return true;
				}

				const isValid = await verifyCurrentPassword(password);

				if (isValid) {
					set({
						isUnlocked: true,
						lastUnlockTime: Date.now(),
					});
					return true;
				}
				return false;
			},

			lock: () => {
				set({
					isUnlocked: false,
					lastUnlockTime: null,
				});
			},

			checkLock: (): boolean => {
				const { isUnlocked, lastUnlockTime, unlockDuration, passwordHash } =
					get();

				if (!passwordHash) return true;

				if (!isUnlocked || !lastUnlockTime) {
					return false;
				}

				const isExpired = Date.now() - lastUnlockTime > unlockDuration;
				if (isExpired) {
					get().lock();
					return false;
				}

				return true;
			},

			setUnlockDuration: (duration: number) => {
				set({ unlockDuration: duration });
			},

			setMasterPassword: async (
				currentPassword: string | null,
				newPassword: string
			): Promise<boolean> => {
				const { passwordHash, verifyCurrentPassword } = get();

				// If there's an existing password, verify the current one
				if (passwordHash && currentPassword) {
					const isCurrentValid = await verifyCurrentPassword(currentPassword);
					if (!isCurrentValid) {
						return false;
					}
				}

				// Hash the new password
				const newHash = CryptoJS.SHA256(newPassword).toString();

				set({
					passwordHash: newHash,
					isInitialized: true,
					isUnlocked: true,
					lastUnlockTime: Date.now(),
				});

				return true;
			},

			verifyCurrentPassword: async (password: string): Promise<boolean> => {
				const { passwordHash } = get();

				if (!passwordHash) return true; // No password set yet

				const hash = CryptoJS.SHA256(password).toString();
				return hash === passwordHash;
			},

			initializeMasterPassword: async (password: string): Promise<boolean> => {
				const { passwordHash } = get();

				// Only allow initialization if no password is set
				if (passwordHash) {
					return false;
				}

				const newHash = CryptoJS.SHA256(password).toString();

				set({
					passwordHash: newHash,
					isInitialized: true,
					isUnlocked: true,
					lastUnlockTime: Date.now(),
				});

				return true;
			},
		}),
		{
			name: 'master-password-storage',
		}
	)
);
