import { Answer, NodeTypeValue } from './models/choice'
import { showInfo, showTitleAndBanner } from './utils/logger.util'
import { networkQuestion } from './questions/network.question'
import { nodeTypeQuestion } from './questions/note_type.question'
import { ConsoleMessage } from './models/console_message'
import { cdnNodeActions } from './actions'

export async function CGX(): Promise<any> {
	showTitleAndBanner()

	const networkAnswer: Answer = await networkQuestion()
	const nodeAnswer: Answer = await nodeTypeQuestion()

	if (nodeAnswer.nodeType === NodeTypeValue.Storage) {
		showInfo(ConsoleMessage.NOT_IMPLEMENTED)
		return
	}

	await cdnNodeActions(networkAnswer.network)
}
