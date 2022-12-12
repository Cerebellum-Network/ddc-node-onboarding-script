import { NetworkValue } from '../../models/choice'
import { BlockchainConfig } from '../../models/blockchain'

export function generateBlockChainConfig(networkType: NetworkValue, seed: string): BlockchainConfig {
	if (networkType === NetworkValue.MAINNET) {
		return {
			activityCaptureContract: '0x0000000000000000000000000000000000000000',
			apiURL: 'wss://mainnet-node.ddcchain.io',
			ddcBucketContract: '0x0000000000000000000000000000000000000000',
			secretPhrase: seed,
		}
	}
	return {
		activityCaptureContract: '5GbMD1Nevv7H7e4UPhHqs8eyEk3eX6eidaY31rXDs3cZCrFW',
		apiURL: 'wss://rpc.devnet.cere.network/ws',
		ddcBucketContract: '5GbMD1Nevv7H7e4UPhHqs8eyEk3eX6eidaY31rXDs3cZCrFW',
		secretPhrase: seed,
	}
}
