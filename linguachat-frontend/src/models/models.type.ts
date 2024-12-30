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

export interface ReturnMessageInterface {
  message: string;
}

export class ReturnMessage implements ReturnMessageInterface {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
