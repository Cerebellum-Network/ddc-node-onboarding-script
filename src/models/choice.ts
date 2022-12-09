export interface Answer {
    network: NetworkValue;
    nodeType: NodeTypeValue;
    walletType: WalletTypeValue;
    walletImportType: WalletImportTypeValue;
    walletConfirm: boolean;
}

export interface Choice {
    name: string;
    value: WalletImportTypeValue | WalletTypeValue | NetworkValue | NodeTypeValue;
}

export enum NetworkValue {
    MAINNET = 'Mainnet',
    TESTNET = 'Testnet',
}

export enum NodeTypeValue {
    CDN = 'CDN',
    Storage = 'Storage',
}

export enum WalletTypeValue {
    New = 'New',
    Existing = 'Existing',
}

export enum WalletImportTypeValue {
    Seed = 'Seed',
    PrivateKey = 'PrivateKey',
}

