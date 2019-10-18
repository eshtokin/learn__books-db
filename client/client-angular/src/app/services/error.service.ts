import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private myMessage: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  updateMessage(message: string) {
    this.myMessage.next(message);
  }

  clearMessage() {
    this.myMessage.next('');
  }
  getMessage(): Observable<string> {
    return this.myMessage;
  }
}

