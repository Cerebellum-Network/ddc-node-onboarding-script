import { showInfo } from '../../utils/logger.util'
import { runCommand } from '../../utils/commands.util'
import { DockerImage } from '../../models/docker_image'

const containerName = 'ddc-cdn-node'

export async function downloadAndStartDockerImage(
	port: number,
	nodeConfigPath: string,
	nodeStoragePath: string,
	dockerImageConfig: DockerImage,
) {
	const dockerImage = `${dockerImageConfig.registry}/${dockerImageConfig.name}:${dockerImageConfig.tag}`
	showInfo(`Downloading docker image '${dockerImage}'...`)
	await runCommand('docker', ['pull', dockerImage]).then(() => {
		showInfo(`Docker image '${dockerImage}' downloaded successfully`)
	})

	// docker rm
	showInfo(`Removing existing docker containers '${dockerImage}'...`)
	await runCommand('docker', ['rm', '-f', containerName])

	showInfo(`Starting docker image '${dockerImage}'...`)
	await runCommand('docker', [
		...['run', '-d'], // such wired syntax is used to avoid pretifier format and keep params in pairs
		...['--name', containerName],
		...['-p', `${port}:${port}`],
		...['-p', '5000:5000'],
		...['-v', `${nodeStoragePath}:/data:rw`],
		...['-v', `${nodeConfigPath}:/ddc-cdn-node/config:rw`],
		dockerImage,
	])
	showInfo('========================================')
	showInfo(`Docker image '${dockerImage}' started successfully`)
	showInfo(`You can check logs with 'docker logs -f ${containerName}'`)
	showInfo('========================================')
}
