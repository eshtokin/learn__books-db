import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-fomr',
  templateUrl: './auth-fomr.component.html',
  styleUrls: ['./auth-fomr.component.css']
})

export class AuthFomrComponent {
 user = {
   email: 'email',
   password: 'password'
 };
}
