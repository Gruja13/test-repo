import { ID } from '@datorama/akita';

export interface User {
  id: ID;
  name: string;
  active: boolean;
}