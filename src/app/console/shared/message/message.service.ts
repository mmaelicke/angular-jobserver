import {Message} from './message.interface';
import {BehaviorSubject} from 'rxjs';

export class MessageService {
  _messages: Message[] = [];
  messages: BehaviorSubject<Message[]>;
  errorCount: BehaviorSubject<number>;
  warningCount: BehaviorSubject<number>;

  constructor() {
    this.messages = new BehaviorSubject<Message[]>(this._messages);
    this.errorCount = new BehaviorSubject<number>(0);
    this.warningCount = new BehaviorSubject<number>(0);
  }

  private addMessage(message: Message) {
    // add the message
    this._messages.push(message);

    // check if message has a timeout
    if (message.timeout) {
      const index = this._messages.length - 1;
      setTimeout(() => {
        this.removeMessage(index);
      }, message.timeout);
    }

    // emit the new messages list
    this.messages.next(this._messages);
  }

  removeMessage(index: number) {
    this._messages.splice(index);
    this.messages.next(this._messages);
  }

  message(message: string, title: string, category: string, closable= true, timeout?) {
    const messageObject = (<Message>{
      message: message,
      title: title,
      category: category,
      closable: closable,
      timeout: timeout
    });
    this.addMessage(messageObject);
  }
  success(message: string, title= 'Success', closeable= true, timeout= 20000) {
    // add a message with success category
    this.message(message, title, 'success', closeable, timeout);
  }

  error(message: string, title= 'Error', closeable= true, timeout?) {
    // add a message with danger category
    this.message(message, title, 'danger', closeable, timeout);
    this.errorCount.next(this.errorCount.getValue() + 1);
  }

  warning(message: string, title= 'Warning', closeable= true, timeout?) {
    // add a message with warning category
    this.message(message, title, 'warning', closeable, timeout);

    this.warningCount.next(this.warningCount.getValue() + 1);
  }

  info(message: string, title= 'Info', closeable= true, timeout?) {
    // add a message with info category
    this.message(message, title, 'info', closeable, timeout);
  }
}
