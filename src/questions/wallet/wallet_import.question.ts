import { Answer } from '../../models/choice'
import inquirer from 'inquirer'

export async function walletImportQuestion(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'walletImportPayload',
			type: 'input',
			message: 'Enter seed phrase:',
		},
	])
}
