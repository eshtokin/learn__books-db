import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-manager-modal',
  templateUrl: './user-manager-modal.component.html',
  styleUrls: ['./user-manager-modal.component.scss']
})
export class UserManagerModalComponent {

  constructor(
    public dialogRef: MatDialogRef<UserManagerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  book = this.data.book;
  onNoClick(): void {
    this.dialogRef.close();
  }

}
