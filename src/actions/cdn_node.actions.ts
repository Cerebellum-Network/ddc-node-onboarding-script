import { Answer, NetworkValue, WalletTypeValue } from '../models/choice'
import { walletQuestion } from '../questions/wallet/wallet_type.question'
import { generateNewWallet } from '../templates/universal/wallet.generate_new'
import { importWallet } from '../templates/universal/wallet.import'
import { walletImportQuestion } from '../questions/wallet/wallet_import.question'
import { KeyringPair } from '@polkadot/keyring/types'
import { walletConfirm } from '../questions/wallet/wallet_confirm.question'
import { nodeConfig } from '../questions/config/config.questions'
import { useDefaultConfig } from '../questions/config/use_default.question'
import { getPort } from '../questions/config/port.question'
import { getStoragePath } from '../questions/config/storage.question'

export async function cdnNodeActions(networkType: NetworkValue): Promise<any> {
	let keyPair: KeyringPair
	const walletType: Answer = await walletQuestion()
	if (walletType.walletType === WalletTypeValue.New) {
		generateNewWallet()
	} else if (walletType.walletType === WalletTypeValue.Existing) {
		while (true) {
			// import key and wait confirmation from user that address is correct
			const walletImport = await walletImportQuestion()
			keyPair = importWallet(walletImport.walletImportPayload)
			const confirmations = await walletConfirm(keyPair.address)
			if (
				confirmations.walletConfirm.toLowerCase() === 'yes' ||
				confirmations.walletConfirm.toLowerCase() === 'y'
			) {
				break
			}
		}
	}

	// node config generation
	const defaultConfig = await useDefaultConfig()
	if (defaultConfig.useDefaultConfig) {
		// if user wants to use default config, ask about port and storage path.
		const port = await getPort()
		console.log(port)
	} else {
		const conf = await nodeConfig()
		console.log(conf)
	}
	const storagePath = await getStoragePath()
	console.log(storagePath)
	// node start
}
