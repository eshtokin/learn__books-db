import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/service/users.service';
import { UserFormAddEditeModalComponent } from './user-forms-add-adite-modal/user-forms-add-adite-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  users: object[];

  init(): void {
    this.userService.getAllUsers().then(el => {
      this.users = el.data.slice();
    });
  }

  deleteUser(id): void {
    this.userService.delete(id)
    .then(res => {
      this.init();
    });
  }

  openDialog(user): void {
    const dialogRef = this.dialog.open(UserFormAddEditeModalComponent, {
      data: {
        user,
        reloadPage: this.ngOnInit.bind(this)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  confirmDialog(userId, userName) {
    const confirmDialog = this.dialog.open(UserDeleteModalComponent, {
      data: {
        userId,
        userName,
        deleteFunc: this.deleteUser.bind(this)
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
    this.init();
  }
}
