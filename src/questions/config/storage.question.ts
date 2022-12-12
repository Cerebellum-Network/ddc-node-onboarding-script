import inquirer from 'inquirer'
import fs from 'fs'
import os from 'os'

import { Answer } from '../../models/choice'
import { showError } from '../../utils/logger.util'

export async function getStoragePath(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'storagePath',
			type: 'input',
			message: `Set path for data storage`,
			default: os.homedir(),
			validate: async (input: string): Promise<boolean> => {
				return new Promise<boolean>((resolve) => {
					if (input.length === 0) {
						resolve(false)
					}
					fs.access(input, fs.constants.W_OK, (err) => {
						if (err) {
							console.log('')
							showError(`Path '${input}' is not writable`)
							return resolve(false)
						}
						return resolve(true)
					})
				})
			},
		},
	])
}
