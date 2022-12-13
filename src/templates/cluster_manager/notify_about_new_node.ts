import { showError, showInfo } from '../../utils/logger.util'
import { NetworkValue } from '../../models/choice'
import fetch from 'node-fetch'

type CreateCertificationResponse = {
	code: string
	data: {
		id: string
		publicKey: string
		createdAt: string
	}
}

export async function notifyAboutNewNode(network: NetworkValue, publicKey: string, nodeAddress: string): Promise<void> {
	showInfo(`Notify clusterManager about new node. Address: ${nodeAddress}. Use public key: ${publicKey}`)
	try {
		const response = await fetch(`${getClusterManagerDomain(network)}/certification`, {
			method: 'POST',
			body: JSON.stringify({
				publicKey: publicKey,
				address: nodeAddress,
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})

		const result = (await response.json()) as CreateCertificationResponse
		if (result.code !== '200') {
			showError(`Error! code: ${result.code}`)
		} else {
			showInfo(`Certification created. Id: ${result.data.id}`)
		}
	} catch (error) {
		showError(`Error while create certification: ${error}`)
	}
}

function getClusterManagerDomain(network: NetworkValue): string {
	if (network === NetworkValue.MAINNET) {
		return 'https://cluster-management.dev.cere.io'
	}
	return 'https://cluster-management.dev.cere.io/'
}
