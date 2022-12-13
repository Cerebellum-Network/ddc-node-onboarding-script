import inquirer from 'inquirer'

import { Answer } from '../../models/choice'

export async function checkAddressCorrect(address: string): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'checkAddressCorrect',
			type: 'input',
			message: 'Is it correct node address?',
			default: address,
		},
	])
}
