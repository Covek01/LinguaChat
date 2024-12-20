//Connection
export interface ConnectionInterface {
  id: number;
  first_id: number;
  second_id: number;
  since: Date;
}

export interface DoubleIds {
  firstId: number;
  secondId: number;
}
