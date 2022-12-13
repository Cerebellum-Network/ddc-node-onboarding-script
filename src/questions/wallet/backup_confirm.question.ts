import { showInfo } from '../../utils/logger.util'
import { Answer } from '../../models/choice'
import inquirer from 'inquirer'

export async function walletBackupConfirm(seed: string): Promise<Answer> {
	showInfo('New wallet created. Please confirm that you backed up seed phrase.')
	showInfo('========================================')
	showInfo(seed)
	showInfo('========================================')
	return inquirer.prompt([
		{
			name: 'walletBackupConfirm',
			type: 'input',
			message: `Are you backed up seed phrase? (yes|no)`,
			validate(input: string): boolean | Promise<boolean> {
				input = input.toLowerCase()
				return input == 'yes' || input == 'no' || input == 'y' || input == 'n'
			},
		},
	])
}
