import fs from 'fs'

export const checkExistence = (path: string): boolean => {
	return fs.existsSync(process.cwd() + path)
}

export const checkIfDirExistElseMakeDir = (path: string): void => {
	if (path) {
		const dir = checkExistence(path)
		if (!dir) {
			fs.mkdirSync(process.cwd() + path, { recursive: true })
		}
	}
}
