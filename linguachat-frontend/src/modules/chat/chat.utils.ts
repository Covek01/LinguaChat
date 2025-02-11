import { Injectable } from '@angular/core';

@Injectable()
export class ChatUtils {
  public messagePaginationLimit: number = 10;

  getNameOfRoom(userFirst: string, userSecond: string): string {
    const nameOfConnection: string =
      userFirst < userSecond
        ? `${userFirst}:${userSecond}`
        : `${userSecond}:${userFirst}`;

    return nameOfConnection;
  }
}
