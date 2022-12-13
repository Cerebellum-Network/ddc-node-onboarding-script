import fetch from 'node-fetch'
import { showError } from '../../utils/logger.util'

type GetAddressResponse = {
	code: string
	data: string
}

export async function getAddress(): Promise<string> {
	try {
		const response = await fetch(`https://cluster-management.dev.cere.io/utils/ip`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
		const result = (await response.json()) as GetAddressResponse
		return result.data
	} catch (error) {
		showError(`Error while detecting address: ${error}`)
		return ''
	}
}
