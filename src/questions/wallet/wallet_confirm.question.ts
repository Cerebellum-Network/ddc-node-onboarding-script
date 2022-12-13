import inquirer from 'inquirer'

import { Answer } from '../../models/choice'

export async function walletConfirm(address: string): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'walletConfirm',
			type: 'input',
			message: `Is this correct address ${address}? (yes|no)`,
			validate(input: string): boolean | Promise<boolean> {
				input = input.toLowerCase()
				return input == 'yes' || input == 'no' || input == 'y' || input == 'n'
			},
		},
	])
}
