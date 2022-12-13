import { showInfo } from '../../utils/logger.util'
import { BlockchainConfig } from '../../models/blockchain'
import { Config } from '../../models/config'
import { LogLevelValue } from '../../models/choice'
import { checkIfDirExistElseMakeDir } from '../../utils/checker.util'
import writeYamlFile = require('write-yaml-file')

export function generateConfig(dataPath: string, blockChainConfig: BlockchainConfig, nodeConfig: Config): string {
	showInfo('Generating node config...')
	const [configPath, storagePath] = getConfigAndStoragePath(dataPath)
	checkIfDirExistElseMakeDir(configPath) // node config will be here
	checkIfDirExistElseMakeDir(storagePath) // node data will be here
	const configFilePath = configPath + '/config.yml'
	writeYamlFile.sync(configFilePath, {
		log: {
			level: nodeConfig.logLevel,
			'report-caller': nodeConfig.logReportCaller,
			'json-format': nodeConfig.logJSONFormat,
		},
		http: {
			port: nodeConfig.httpPort,
			'max-concurrent-streams': nodeConfig.httpMaxConcurrentStreams,
			'max-stream-size': nodeConfig.httpStreamSize,
			'max-frame-size': nodeConfig.httpMaxFrameSize,
			'initial-window-size': nodeConfig.httpInitialWindowSize,
		},
		configuration: {
			path: configPath,
		},
		badger: {
			path: storagePath,
		},
		blockchain: {
			'api-url': blockChainConfig.apiURL,
			'secret-phrase': blockChainConfig.secretPhrase,
			'ddc-bucket-contract': blockChainConfig.ddcBucketContract,
			'activity-capture-contract': blockChainConfig.activityCaptureContract,
		},
		cache: {
			ack: {
				size: 1024,
			},
		},
		'debug-enabled': false,
		'hide-banner': false,
	})
	return configFilePath
}

export function getDefaultConfig(): Config {
	return {
		logLevel: LogLevelValue.Info,
		logReportCaller: false,
		logJSONFormat: true,
		httpPort: 8080,
		httpMaxConcurrentStreams: 250,
		httpStreamSize: 5242880,
		httpMaxFrameSize: 5242880,
		httpInitialWindowSize: 5242880,
	}
}

export function getConfigAndStoragePath(basePath: string): [string, string] {
	const dataPathPrefix = basePath.replace(/\/*$/, '') + '/ddc'
	return [dataPathPrefix + '/config', dataPathPrefix + '/data']
}
