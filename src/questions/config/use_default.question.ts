import inquirer from 'inquirer'

import { Answer } from '../../models/choice'

export async function useDefaultConfig(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'useDefaultConfig',
			type: 'confirm',
			message: 'Use default config?',
			default: true,
		},
	])
}
