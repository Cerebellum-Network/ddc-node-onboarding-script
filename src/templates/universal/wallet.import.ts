import { showInfo } from '../../utils/logger.util'
import { Keyring } from '@polkadot/keyring'
import { KeyringPair } from '@polkadot/keyring/types'

export function importWallet(payload: string): KeyringPair {
	showInfo('Importing wallet from seed phrase...')
	return importFromSeed(payload)
}

function importFromSeed(seedPhrase: string): KeyringPair {
	const keyring = new Keyring()
	return keyring.addFromUri(seedPhrase)
}
