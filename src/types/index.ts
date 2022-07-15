export interface Transaction {
    matterId: number;
    id: number;
    isFavorite: boolean;
    nameOfinstitution: string;
    accountNo: string;
    transactionDate: Date;
    transactionNumner: string;
    description: string;
    withdrawalOrDeposit: string;
    transactionType: string;
    amount: number;
    url: string;
    pageNo: number;
    justificationStatus: string;
}

