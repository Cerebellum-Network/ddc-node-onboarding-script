import { Answer, NetworkValue, WalletTypeValue } from '../models/choice'
import { walletQuestion } from '../questions/wallet/wallet_type.question'
import { generateNewWallet } from '../templates/wallet/generate_new'
import { importWallet } from '../templates/wallet/import'
import { walletImportQuestion } from '../questions/wallet/wallet_import.question'
import { walletConfirm } from '../questions/wallet/wallet_confirm.question'
import { fillNodeConfig } from '../questions/config/config.questions'
import { useDefaultConfig } from '../questions/config/use_default.question'
import { getPort } from '../questions/config/port.question'
import { getStoragePath } from '../questions/config/storage.question'
import { generateBlockChainConfig } from '../templates/blockchain/get_blockchain_config'
import { generateConfig, getConfigAndStoragePath, getDefaultConfig } from '../templates/config/generate_config'
import { showError, showInfo } from '../utils/logger.util'
import { downloadAndStartDockerImage } from '../templates/docker/image'
import { notifyAboutNewNode } from '../templates/cluster_manager/notify_about_new_node'
import { walletBackupConfirm } from '../questions/wallet/backup_confirm.question'
import { checkSeed } from '../questions/wallet/seed_check'
import { notifyClusterManager } from '../questions/cluster_manager/ask_notify.question'
import { getAddress } from '../templates/cluster_manager/get_address'
import { checkAddressCorrect } from '../questions/cluster_manager/check_address.question'

export async function cdnNodeActions(networkType: NetworkValue): Promise<void> {
	let seedPhrase = '',
		publicKey = '',
		valid = false
	const walletType: Answer = await walletQuestion()
	if (walletType.walletType === WalletTypeValue.New) {
		const [keyPair, seed] = await generateNewWallet()
		while (!valid) {
			// generate seed phrase and wait confirmation that user backed up it
			const confirm: Answer = await walletBackupConfirm(seed)
			valid = checkAnswerYes(confirm.walletBackupConfirm)
			if (valid) {
				await checkSeed(seed)
				seedPhrase = seed
				publicKey = keyPair.publicKey.toString()
				showInfo('Seed phrase confirmed.')
				showInfo(`Address of your wallet: ${keyPair.address}`)
				break
			}
		}
	} else if (walletType.walletType === WalletTypeValue.Existing) {
		while (!valid) {
			// import key and wait confirmation from user that address is correct
			const walletImport = await walletImportQuestion()
			const [keyPair, ok] = importWallet(walletImport.walletImportPayload)
			if (!ok || !keyPair) {
				continue
			}
			const confirmations = await walletConfirm(keyPair.address)
			valid = checkAnswerYes(confirmations.walletConfirm)
			if (valid) {
				seedPhrase = walletImport.walletImportPayload
				publicKey = keyPair.publicKey.toString()
				break
			}
		}
	}
	showInfo('Wallet created. Generating config...')

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

	showInfo('Config generated. Generating config file...')
	// generate config file
	try {
		const filePath = generateConfig(storagePath.storagePath, blockChainConfig, nodeConfig)
		showInfo(`Config file generated: ${filePath}`)
	} catch (err) {
		showError('File write failed with error: ' + err)
		process.exit(1) // we can't rewrite file, exit script
	}
	// node start
	showInfo('Starting node...')
	const [nodeConfigPath, nodeStoragePath] = getConfigAndStoragePath(storagePath.storagePath)
	await downloadAndStartDockerImage(networkType, nodeConfig.httpPort, nodeConfigPath, nodeStoragePath)

	// notify cluster manager about new node start
	const notify = await notifyClusterManager()
	if (notify.notifyClusterManager) {
		const address = await getAddress()
		const result = await checkAddressCorrect(`${address}:${nodeConfig.httpPort}`)
		await notifyAboutNewNode(networkType, publicKey, result.checkAddressCorrect)
	}
}

function checkAnswerYes(answer: string): boolean {
	return answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y'
}
