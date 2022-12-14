import { BlockchainConfig } from './blockchain'
import { DockerImage } from './docker_image'

export interface AppConfig {
	blockchain: BlockchainConfig
	dockerImage: DockerImage
	clusterManagerURL: string
}
