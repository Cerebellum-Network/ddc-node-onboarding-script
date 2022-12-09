import {showInfo} from "../../utils/logger.util";
import {WalletImportTypeValue} from "../../models/choice";
import {Keyring} from "@polkadot/keyring";
import {KeyringPair} from "@polkadot/keyring/types";

export function importWallet(importType: WalletImportTypeValue, payload: string) :KeyringPair{
    if (importType === WalletImportTypeValue.Seed) {
        showInfo('Importing wallet from seed phrase...');
        return importFromSeed(payload);
    } else {
        showInfo('Importing wallet from private key...');
        return importFromSeed(payload);
    }
}

function importFromSeed(seedPhrase: string) :KeyringPair {
    const keyring = new Keyring();
    return keyring.addFromUri(seedPhrase);
}