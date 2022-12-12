import inquirer from 'inquirer'

import { Answer } from '../../models/choice'

export async function getPort(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'httpPort',
			type: 'input',
			message: `Set http port`,
			default: 8080,
		},
	])
}
