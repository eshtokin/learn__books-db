import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormControleResult } from 'src/app/models/form-controle-result.model';
import { UserService } from 'src/app/services/users.service';
import { validatorForFormControl, getRegExpFor } from 'src/app/services/reactive-form-helper';

@Component({
  selector: 'app-profile-edite-modal',
  templateUrl: './profile-edite-modal.component.html',
  styleUrls: ['./profile-edite-modal.component.scss']
})
export class ProfileEditeModalComponent implements OnInit {
  public confPass = true;
  public profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().name)]),
    email: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().email)]),
    password: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().password)]),
    confirmPassword: new FormControl('', [Validators.required, validatorForFormControl(getRegExpFor().password)]) // this.checkPassword
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      user: User,
      refresh: () => void
    },
    public editeProfileModal: MatDialogRef<ProfileEditeModalComponent>,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  public closeModal(): void {
    this.editeProfileModal.close();
  }

  public save(): void {
    if (this.profileForm.value.password.length && this.data.user.password !== this.profileForm.value.password) {
      this.data.user.password = this.profileForm.value.password;
    }
    this.userService.edit(this.data.user._id, this.data.user)
    .then(() => {
      this.editeProfileModal.close();
      this.data.refresh();
    });
  }

  public uploadFile(e, id: string): void {
    const input = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      this.data.user.image = reader.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
