import {showInfo} from "../../utils/logger.util";
import { Keyring } from '@polkadot/keyring';

export function generateNewWallet() {
    showInfo('Creating new wallet...');
    const keyring = new Keyring({ type: 'sr25519' });
}