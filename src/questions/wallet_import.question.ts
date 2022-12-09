import {Answer, WalletImportTypeValue} from "../models/choice";
import inquirer from "inquirer";

export async function walletImportQuestion(): Promise<[Answer, string]> {
    const importType = await inquirer.prompt([{
        name: 'walletImportType',
        type: 'list',
        message: 'Import wallet:',
        choices:  [
            {name: 'Seed phrase', value: WalletImportTypeValue.Seed},
            {name: 'Import private key', value: WalletImportTypeValue.PrivateKey},
        ],
    }]);
    let label = '';
    if (importType == WalletImportTypeValue.Seed) {
        label = 'Enter seed phrase:';
    } else {
        label = 'Enter private key:';
    }
    const payload = await inquirer.prompt([{
        name: 'walletImportPayload',
        type: 'input',
        message: label,
    }]);
    return [importType, payload.walletImportPayload];
}