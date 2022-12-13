export interface Answer {
	network: NetworkValue
	nodeType: NodeTypeValue
	walletType: WalletTypeValue
	walletImportPayload: string // seed phrase here
	walletConfirm: string
	walletBackupConfirm: string
	useDefaultConfig: boolean
	httpPort: number
	storagePath: string
	notifyClusterManager: boolean
	checkAddressCorrect: string
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

export enum LogLevelValue {
	Info = 'info',
	Trace = 'trace',
	Debug = 'debug',
	Warning = 'warning',
	Error = 'error',
	Fatal = 'fatal',
	Panic = 'panic',
}
