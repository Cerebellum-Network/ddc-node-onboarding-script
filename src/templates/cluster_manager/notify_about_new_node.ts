import { showError, showInfo } from '../../utils/logger.util'
import fetch from 'node-fetch'

type CreateCertificationResponse = {
	code: string
	data: {
		id: string
		publicKey: string
		createdAt: string
	}
}

export async function notifyAboutNewNode(
	clusterManagerURL: string,
	publicKey: string,
	nodeAddress: string,
): Promise<void> {
	showInfo(`Notify clusterManager about new node. Address: ${nodeAddress}. Use public key: ${publicKey}`)
	try {
		const response = await fetch(`${clusterManagerURL}/certification`, {
			method: 'POST',
			body: JSON.stringify({
				publicKey: publicKey,
				url: nodeAddress,
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})

		const result = (await response.json()) as CreateCertificationResponse
		if (result.code !== 'SUCCESS') {
			showError(`Error! code: ${result.code}`)
		} else {
			showInfo(`Certification created. Id: ${result.data.id}`)
		}
	} catch (error) {
		showError(`Error while create certification: ${error}`)
	}
}
