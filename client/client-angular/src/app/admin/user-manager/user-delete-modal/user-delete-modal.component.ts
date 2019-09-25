import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo } from 'src/app/service/user-info.service';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent {

  constructor(
    public confirmDialog: MatDialogRef<UserDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userId: string,
      userEmail: string,
      deleteFunc: (userId: string) => void
    },
    public userInfo: UserInfo
  ) {}

  public cancel(): void {
    this.confirmDialog.close();
  }

  public delete(): void {
    if (this.data.userId !== this.userInfo.getCurrentUser().id) {
      this.data.deleteFunc(this.data.userId);
    }
    this.cancel();
  }
}
