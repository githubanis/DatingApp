import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(
      (res) => {
        console.log('Register Success', res);
      }, (err) => {
        console.log('Register failed', err);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Called');
  }

}
