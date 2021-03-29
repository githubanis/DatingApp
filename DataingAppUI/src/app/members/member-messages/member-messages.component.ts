import { Component, Input, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Message} from 'src/app/_models/message';
import {AlertifyService} from 'src/app/_services/alertify.service';
import {AuthService} from 'src/app/_services/auth.service';
import {UserService} from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService.getMessagesThread(this.authService.decodedToken.nameid, this.recipientId)
      .pipe(
        tap(
          (messages) => {
            console.log(messages);
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < messages.length; index++) {
              if (messages[index].isRead === false && messages[index].recipientId === currentUserId) {
                console.log(messages[index].recipientId , currentUserId);
                this.userService.markAsRead(currentUserId, messages[index].id);
              }
            }
          }
        )
      )
      .subscribe(
        (res) => {
          this.messages = res;
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe(
      (res: Message) => {
        this.messages.unshift(res);
        this.newMessage.content = '';
      },
      (err) => {
        this.alertify.error(err);
      }
    );
  }

}
