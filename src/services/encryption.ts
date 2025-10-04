// src/services/encryption.ts
import CryptoJS from 'crypto-js';

export class EncryptionService {
	private static deriveKey(
		passphrase: string,
		salt: string
	): CryptoJS.lib.WordArray {
		return CryptoJS.PBKDF2(passphrase, salt, {
			keySize: 256 / 32,
			iterations: 1000,
		});
	}

	static encrypt(data: string, passphrase: string): string {
		const salt = CryptoJS.lib.WordArray.random(128 / 8);
		const key = this.deriveKey(passphrase, salt.toString());
		const iv = CryptoJS.lib.WordArray.random(128 / 8);

		const encrypted = CryptoJS.AES.encrypt(data, key, {
			iv: iv,
			padding: CryptoJS.pad.Pkcs7,
			mode: CryptoJS.mode.CBC,
		});

		const combined = salt.toString() + iv.toString() + encrypted.toString();
		return combined;
	}

	static decrypt(encryptedData: string, passphrase: string): string {
		try {
			const salt = CryptoJS.enc.Hex.parse(encryptedData.substring(0, 32));
			const iv = CryptoJS.enc.Hex.parse(encryptedData.substring(32, 64));
			const ciphertext = encryptedData.substring(64);

			const key = this.deriveKey(passphrase, salt.toString());

			const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
				iv: iv,
				padding: CryptoJS.pad.Pkcs7,
				mode: CryptoJS.mode.CBC,
			});

			return decrypted.toString(CryptoJS.enc.Utf8);
		} catch (error) {
			throw new Error('Failed to decrypt data');
		}
	}
}
