import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './message.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  messageSubscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageSubscription = this.messageService.messages.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onRemoveMessage(index: number) {
    this.messageService.removeMessage(index);
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
  }

}
