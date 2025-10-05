// src/services/cacheService.ts
import { EncryptionService } from './encryption';
import { useMasterPasswordStore } from '../store/masterPasswordStore';
import type { Secret } from './secrets.api';

export interface CacheItem<T> {
	data: T;
	timestamp: number;
	expiresAt: number;
}

export class CacheService {
	private static readonly CACHE_PREFIX = 'secret_cache_';
	private static readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

	static getEncryptionKey(): string {
		const masterPassword = this.getMasterPasswordForEncryption();
		const baseKey = import.meta.env.VITE_ENCRYPTION_KEY || 'secure-key';
		return `${baseKey}-${masterPassword}`;
	}

	private static getMasterPasswordForEncryption(): string {
		const state = useMasterPasswordStore.getState();

		if (state.passwordHash && !state.isUnlocked) {
			throw new Error('Master password required to access encrypted data');
		}

		// Use the password hash as part of the encryption key
		return state.passwordHash || 'no-password-set';
	}

	static set(key: string, data: Secret, ttl: number = this.DEFAULT_TTL): void {
		try {
			const { passwordHash, checkLock } = useMasterPasswordStore.getState();

			// If password is set, require unlock
			if (passwordHash && !checkLock()) {
				throw new Error('Master password required to encrypt data');
			}

			const cacheItem: CacheItem<Secret> = {
				data,
				timestamp: Date.now(),
				expiresAt: Date.now() + ttl,
			};

			const encrypted = EncryptionService.encrypt(
				JSON.stringify(cacheItem),
				this.getEncryptionKey()
			);

			localStorage.setItem(`${this.CACHE_PREFIX}${key}`, encrypted);
		} catch (error) {
			console.error('Failed to cache encrypted data:', error);
			throw error;
		}
	}

	static get(key: string): Secret | null {
		try {
			const { passwordHash, checkLock } = useMasterPasswordStore.getState();

			// If password is set, require unlock
			if (passwordHash && !checkLock()) {
				throw new Error('Master password required to decrypt data');
			}

			const encrypted = localStorage.getItem(`${this.CACHE_PREFIX}${key}`);
			if (!encrypted) return null;

			const decrypted = EncryptionService.decrypt(
				encrypted,
				this.getEncryptionKey()
			);
			const cacheItem: CacheItem<Secret> = JSON.parse(decrypted);

			if (Date.now() > cacheItem.expiresAt) {
				this.remove(key);
				return null;
			}

			return cacheItem.data;
		} catch (error) {
			console.error('Failed to retrieve cached data:', error);
			return null;
		}
	}

	static remove(key: string): void {
		localStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
	}

	static clear(): void {
		// Clear only cache items, not other localStorage data
		Object.keys(localStorage)
			.filter((key) => key.startsWith(this.CACHE_PREFIX))
			.forEach((key) => localStorage.removeItem(key));
	}

	static getAllKeys(): Secret[] | null {
		const keys = Object.keys(localStorage);
		const filteredKeys = keys.filter((key) =>
			key.startsWith(this.CACHE_PREFIX)
		);

		return filteredKeys
			? filteredKeys.map(
					(key) => this.get(key.replace(this.CACHE_PREFIX, '')) as Secret
			  )
			: null;
	}

	// static cleanup(): void {
	// 	const keys = this.getAllKeys();

	// 	keys?.forEach((key) => {
	// 		this.get(key); // This will automatically remove expired items if unlocked
	// 	});
	// }

	// Clear all cached secrets when changing master password
	static clearAllSecrets(): void {
		this.clear();
	}
}
