import { LogLevelValue } from './choice'

export interface Config {
	logLevel: LogLevelValue
	logReportCaller: boolean
	logJSONFormat: boolean
	httpPort: number
	httpMaxConcurrentStreams: number
	httpStreamSize: number
	httpMaxFrameSize: number
	httpInitialWindowSize: number
}
