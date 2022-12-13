import inquirer from 'inquirer'

import { Answer } from '../../models/choice'

export async function checkNodeAddress(address: string): Promise<Answer> {
	const result = await inquirer.prompt([
		{
			name: 'nodeAddress',
			type: 'input',
			message: 'Is it correct node address?',
			default: address,
		},
		{
			name: 'nodeHTTPS',
			type: 'confirm',
			message: 'Use https?',
			default: true,
		},
	])

	let nodeURL = `http://${result.nodeAddress}`
	if (result.nodeHTTPS) {
		nodeURL = `https://${result.nodeAddress}`
	}

	return inquirer.prompt([
		{
			name: 'nodeURL',
			type: 'input',
			message: 'Is it correct node url?',
			default: nodeURL,
		},
	])
}
