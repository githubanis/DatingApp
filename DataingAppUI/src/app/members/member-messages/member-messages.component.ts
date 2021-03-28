import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessagesThread(this.authService.decodedToken.nameid, this.recipientId)
      .subscribe(
        (res) => {
          this.messages = res;
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }

}
