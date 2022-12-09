import { Answer, NodeTypeValue } from './models/choice';
import { showInfo, showTitleAndBanner } from './utils/logger.util';
import { networkQuestion } from "./questions/network.questions";
import { nodeTypeQuestion } from "./questions/note_type.questions";
import { ConsoleMessage } from "./models/console-message";
import { cdnNodeActions } from "./actions/cdn_node.actions";

export async function CGX(): Promise<any> {
    showTitleAndBanner();

    const networkAnswer: Answer = await networkQuestion();
    const nodeAnswer: Answer = await nodeTypeQuestion();

    if (nodeAnswer.nodeType === NodeTypeValue.Storage) {
        showInfo(ConsoleMessage.NOT_IMPLEMENTED);
        return;
    }

    await cdnNodeActions(networkAnswer.network);
}
