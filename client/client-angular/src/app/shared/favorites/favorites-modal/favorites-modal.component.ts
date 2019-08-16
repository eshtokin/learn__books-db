import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites-modal',
  templateUrl: './favorites-modal.component.html',
  styleUrls: ['./favorites-modal.component.scss']
})
export class FavoritesModalComponent {

  constructor(
    public dialogRef: MatDialogRef<FavoritesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  book = this.data.book;
  onNoClick(): void {
    this.dialogRef.close();
  }

}
