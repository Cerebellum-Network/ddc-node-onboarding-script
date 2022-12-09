import {Answer, WalletTypeValue} from "../models/choice";
import inquirer from "inquirer";

export async function walletQuestion(): Promise<Answer> {
    return inquirer.prompt([{
        name: 'walletType',
        type: 'list',
        message: 'Setup wallet:',
        choices:  [
            {name: 'Create new', value: WalletTypeValue.New},
            {name: 'Import existing', value: WalletTypeValue.Existing},
        ],
    }]);
}