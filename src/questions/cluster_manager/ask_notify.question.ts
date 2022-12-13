import inquirer from 'inquirer'

import { Answer } from '../../models/choice'

export async function notifyClusterManager(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'notifyClusterManager',
			type: 'confirm',
			message: 'Notify cluster manager about new node?',
			default: true,
		},
	])
}
