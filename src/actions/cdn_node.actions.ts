import {Answer, NetworkValue, WalletTypeValue} from "../models/choice";
import {walletQuestion} from "../questions/wallet_type.question";
import {generateNewWallet} from "../templates/universal/wallet.generate_new";
import {importWallet} from "../templates/universal/wallet.import";
import {walletImportQuestion} from "../questions/wallet_import.question";
import {KeyringPair} from "@polkadot/keyring/types";
import {walletConfirm} from "../questions/wallet_confirm.question";

export async function cdnNodeActions(networkType: NetworkValue): Promise<any> {
    let keyPair: KeyringPair;
    const walletType: Answer = await walletQuestion();
    if (walletType.walletType === WalletTypeValue.New) {
        generateNewWallet()
    } else if (walletType.walletType === WalletTypeValue.Existing) {
        while (true) {
            const [walletImportType, payload] = await walletImportQuestion();
            keyPair = importWallet(walletImportType.walletImportType, payload)
            const confirmations = await walletConfirm(keyPair.address)
            if (confirmations.walletConfirm) {
                break
            }
        }
    }
}