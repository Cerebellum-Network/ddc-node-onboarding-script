import { spawn } from 'node:child_process'
import { showError } from './logger.util'

export async function runCommand(binary: string, args: string[]): Promise<number> {
	return new Promise<number>((resolve, reject) => {
		const cmd = spawn(binary, args, {
			detached: true,
			stdio: ['inherit', 'inherit', 'inherit'],
		})
		cmd.on('close', (code: number) => {
			if (code !== 0) {
				showError(`command '${binary} ${args.join(' ')}' failed with code ${code}`)
				process.exit(code)
			}
			resolve(code)
		})
		cmd.on('error', (err: any) => {
			showError('Error while running command: ' + err)
			process.exit(1)
		})
	})
}
