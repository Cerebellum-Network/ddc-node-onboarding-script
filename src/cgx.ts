import { Answer, NetworkValue, NodeTypeValue } from './models/choice'
import { showInfo, showTitleAndBanner } from './utils/logger.util'
import { networkQuestion } from './questions/network.question'
import { nodeTypeQuestion } from './questions/note_type.question'
import { ConsoleMessage } from './models/console_message'
import { cdnNodeActions } from './actions'
import { filePath, mainnet, testnet } from './constants.json'
import { AppConfig } from './models/app_config'
import { filePathConfig } from './models/file_path'

export async function CGX(): Promise<void> {
	showTitleAndBanner()

	const networkAnswer: Answer = await networkQuestion()
	const nodeAnswer: Answer = await nodeTypeQuestion()

	if (nodeAnswer.nodeType === NodeTypeValue.Storage) {
		showInfo(ConsoleMessage.NOT_IMPLEMENTED)
		return
	}

	await cdnNodeActions(
		networkAnswer.network === NetworkValue.MAINNET ? (mainnet as AppConfig) : (testnet as AppConfig),
		filePath as filePathConfig,
	)
}
