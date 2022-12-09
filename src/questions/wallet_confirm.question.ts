import inquirer from 'inquirer';

import { Answer } from '../models/choice';

export async function walletConfirm(address:string): Promise<Answer> {
    return inquirer.prompt([{
        name: 'walletConfirm',
        type: 'confirm',
        message: `Is this correct address ${address}?`,
        askAnswered: true,
    }]);
}