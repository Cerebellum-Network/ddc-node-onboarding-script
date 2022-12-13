import { showInfo } from '../../utils/logger.util'
import { Keyring } from '@polkadot/keyring'
import { bip39Generate, bip39ToSeed, waitReady } from '@polkadot/wasm-crypto'
import { KeyringPair } from '@polkadot/keyring/types'

export async function generateNewWallet(): Promise<[KeyringPair, string]> {
	await waitReady()
	showInfo('Creating new wallet...')
	// generate phrase
	const seedPhrase = bip39Generate(12)
	const keyring = new Keyring()
	return [keyring.addFromUri(seedPhrase), seedPhrase]
}
