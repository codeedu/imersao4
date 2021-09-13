export enum TransactionCategory {
    CATEGORY1 = "category1",
    CATEGORY2 = "category2",
  }
  
  export const TransactionCategoryLabels = [
    { value: TransactionCategory.CATEGORY1, label: "Categoria 1" },
    { value: TransactionCategory.CATEGORY2, label: "Categoria 2" },
  ];
  
  export enum TransactionType {
    CREDIT = "credit",
    DEBIT = "debit",
  }
  
  export const TransactionTypeLabels = [
    { value: TransactionType.CREDIT, label: "Crédito" },
    { value: TransactionType.DEBIT, label: "Débito" },
  ];
  
  export interface Transaction {
    id: string;
    payment_date: string;
    name: string;
    description: string;
    category: TransactionCategory;
    amount: number;
    type: TransactionType;
    created_at: string;
  }