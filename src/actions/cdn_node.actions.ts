import { Answer, NetworkValue, WalletTypeValue } from '../models/choice'
import { walletQuestion } from '../questions/wallet/wallet_type.question'
import { generateNewWallet } from '../templates/wallet/generate_new'
import { importWallet } from '../templates/wallet/import'
import { walletImportQuestion } from '../questions/wallet/wallet_import.question'
import { KeyringPair } from '@polkadot/keyring/types'
import { walletConfirm } from '../questions/wallet/wallet_confirm.question'
import { fillNodeConfig } from '../questions/config/config.questions'
import { useDefaultConfig } from '../questions/config/use_default.question'
import { getPort } from '../questions/config/port.question'
import { getStoragePath } from '../questions/config/storage.question'
import { generateBlockChainConfig } from '../templates/blockchain/get_blockchain_config'
import { generateConfig, getConfigAndStoragePath, getDefaultConfig } from '../templates/config/generate_config'
import { showError, showInfo } from '../utils/logger.util'
import { downloadAndStartDockerImage } from '../templates/docker/image'

export async function cdnNodeActions(networkType: NetworkValue): Promise<any> {
	let seedPhrase = ''
	const walletType: Answer = await walletQuestion()
	if (walletType.walletType === WalletTypeValue.New) {
		generateNewWallet()
		seedPhrase = 'todo it'
	} else if (walletType.walletType === WalletTypeValue.Existing) {
		while (true) {
			// import key and wait confirmation from user that address is correct
			const walletImport = await walletImportQuestion()
			const [keyPair, ok] = importWallet(walletImport.walletImportPayload)
			if (!ok || !keyPair) {
				continue
			}
			const confirmations = await walletConfirm(keyPair.address)
			if (
				confirmations.walletConfirm.toLowerCase() === 'yes' ||
				confirmations.walletConfirm.toLowerCase() === 'y'
			) {
				seedPhrase = walletImport.walletImportPayload
				break
			}
		}
	}

	// node config generation
	let nodeConfig = getDefaultConfig()
	const defaultConfig = await useDefaultConfig()
	if (defaultConfig.useDefaultConfig) {
		const port = await getPort() // if user wants to use default config, ask about port.
		nodeConfig.httpPort = port.httpPort
	} else {
		nodeConfig = await fillNodeConfig()
	}
	const storagePath = await getStoragePath()
	const blockChainConfig = generateBlockChainConfig(networkType, seedPhrase)

	// generate config file
	try {
		const filePath = generateConfig(storagePath.storagePath, blockChainConfig, nodeConfig)
		showInfo(`Config file generated: ${filePath}`)
	} catch (err) {
		showError('File write failed with error: ' + err)
		process.exit(1) // we can't rewrite file, exit script
	}
	// node start
	const [nodeConfigPath, nodeStoragePath] = getConfigAndStoragePath(storagePath.storagePath)
	await downloadAndStartDockerImage(networkType, nodeConfig.httpPort, nodeConfigPath, nodeStoragePath)
}
