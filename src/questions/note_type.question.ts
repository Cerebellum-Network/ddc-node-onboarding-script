import inquirer from 'inquirer'

import { Answer, NodeTypeValue } from '../models/choice'

export async function nodeTypeQuestion(): Promise<Answer> {
	return inquirer.prompt([
		{
			name: 'nodeType',
			type: 'list',
			message: 'Select node type:',
			choices: [
				{ name: 'CDN', value: NodeTypeValue.CDN },
				{ name: 'Storage', value: NodeTypeValue.Storage },
			],
		},
	])
}
