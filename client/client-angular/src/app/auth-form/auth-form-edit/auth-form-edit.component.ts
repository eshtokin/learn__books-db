import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/users.service';

@Component({
  selector: 'app-auth-form-edit',
  templateUrl: './auth-form-edit.component.html',
  styleUrls: ['./auth-form-edit.component.scss']
})
export class AuthFormEditComponent implements OnInit {

  constructor(
    private useService: UserService
  ) { }

    edite() {
      console.log('edite');
    }

  ngOnInit() {
  }
}
