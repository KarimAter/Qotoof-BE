// /* eslint-disable @typescript-eslint/no-shadow */

import { Transaction } from './transaction';

export interface TransactionType {
  id: string;
  name: string;
  transactions?: Transaction[];
  createdAt: string;
  updatedAt: string;
}
