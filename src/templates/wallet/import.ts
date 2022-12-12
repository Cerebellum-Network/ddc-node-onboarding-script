import { showError, showInfo } from '../../utils/logger.util'
import { Keyring } from '@polkadot/keyring'
import { KeyringPair } from '@polkadot/keyring/types'

export function importWallet(payload: string): [KeyringPair | null, boolean] {
	showInfo('Importing wallet from seed phrase...')
	try {
		return [importFromSeed(payload), true]
	} catch (err) {
		showError('Error while importing wallet: ' + err)
		return [null, false]
	}
}

function importFromSeed(seedPhrase: string): KeyringPair {
	const keyring = new Keyring()
	return keyring.addFromUri(seedPhrase)
}
