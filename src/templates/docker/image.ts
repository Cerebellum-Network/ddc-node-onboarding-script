import { NetworkValue } from '../../models/choice'
import { showInfo } from '../../utils/logger.util'
import { runCommand } from '../../utils/commands.util'

interface DockerImage {
	name: string
	tag: string
	registry: string
}

const devnetImage: DockerImage = {
	name: 'ddc-cdn-node',
	tag: 'dev-latest',
	registry: 'cerebellumnetwork',
}

const mainnetImage: DockerImage = {
	name: 'ddc-cdn-node',
	tag: 'dev-latest',
	registry: 'cerebellumnetwork',
}

const containerName = 'ddc-cdn-node'

export async function downloadAndStartDockerImage(
	network: NetworkValue,
	port: number,
	nodeConfigPath: string,
	nodeStoragePath: string,
) {
	const image = network === NetworkValue.MAINNET ? mainnetImage : devnetImage
	const dockerImage = `${image.registry}/${image.name}:${image.tag}`
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
		...['-p', `${port}:8080`],
		...['-p', '5000:5000'],
		...['-v', `${nodeStoragePath}:/data:rw`],
		...['-v', `${nodeConfigPath}:/ddc-cdn-node/config:rw`],
		dockerImage,
	])
	showInfo(`Docker image '${dockerImage}' started successfully`)
	showInfo(`You can check logs with 'docker logs -f ${containerName}'`)
}
