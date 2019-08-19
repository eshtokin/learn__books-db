import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.scss']
})
export class UserDeleteModalComponent {

  constructor(
    public confirmDialog: MatDialogRef<UserDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancel() {
    this.confirmDialog.close();
  }

  delete() {
    this.data.deleteFunc(this.data.userId);
    this.confirmDialog.close();
  }

  onNoClick(): void {
    this.confirmDialog.close();
  }
}
