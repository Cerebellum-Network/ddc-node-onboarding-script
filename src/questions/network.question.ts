import inquirer from 'inquirer'

import { Answer, NetworkValue } from '../models/choice'

export async function networkQuestion(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'network',
			type: 'list',
			message: 'Select network:',
			choices: [
				{ name: 'Mainnet', value: NetworkValue.MAINNET },
				{ name: 'Testnet', value: NetworkValue.TESTNET },
			],
		},
	])
}
