import inquirer from 'inquirer'

import { Answer, LogLevelValue } from '../../models/choice'

export async function nodeConfig(): Promise<Answer> {
	return inquirer.prompt([
		// log section
		{
			name: 'logLevel',
			type: 'list',
			message: `Set node log level`,
			choices: [
				{ name: 'Info', value: LogLevelValue.Info },
				{ name: 'Trace', value: LogLevelValue.Trace },
				{ name: 'Debug', value: LogLevelValue.Debug },
				{ name: 'Warning', value: LogLevelValue.Warning },
				{ name: 'Error', value: LogLevelValue.Error },
				{ name: 'Fatal', value: LogLevelValue.Fatal },
				{ name: 'Panic', value: LogLevelValue.Panic },
			],
			default: LogLevelValue.Info,
		},
		{
			name: 'logReportCaller',
			type: 'confirm',
			message: `show method and file log caller. (can decreases performance if enabled)`,
			default: false,
		},
		{
			name: 'logJSONFormat',
			message: `show logs in json format`,
			type: 'confirm',
			default: true,
		},
		// http section
		{
			name: 'httpPort',
			type: 'input',
			message: `Set http port`,
			default: 8080,
		},
		{
			name: 'httpMaxConcurrentStreams',
			type: 'input',
			message: 'Max number streams for connection',
			default: 250,
		},
		{
			name: 'httpStreamSize',
			type: 'input',
			message: 'Octets number (default is about 5MB), max stream size for connection',
			default: 5242880,
		},
		{
			name: 'httpMaxFrameSize',
			type: 'input',
			message: 'Octets number (default is about 5MB), max frame size for connection',
			default: 5242880,
		},
		{
			name: 'httpInitialWindowSize',
			type: 'input',
			message: 'Octets number (default is about 5MB), initial window size for connection',
			default: 5242880,
		},
	])
}
