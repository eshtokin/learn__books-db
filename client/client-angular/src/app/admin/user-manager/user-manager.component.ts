import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/users.service';
import { UserFormAddEditeModalComponent } from './user-forms-add-adite-modal/user-forms-add-adite-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  public users: object[];
  public searchString: string;
  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.userService.getAllUsers()
    .then(users => {
      this.users = users;
    });
  }

  public deleteUser(id: string): void {
    this.userService.delete(id)
    .then(res => {
      this.init();
    });
  }

  public openDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFormAddEditeModalComponent, {
      data: {
        user,
        reloadPage:  this.init.bind(this)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public confirmDialog(userId: string, userEmail: string): void {
    const confirmDialog = this.dialog.open(UserDeleteModalComponent, {
      data: {
        userId,
        userEmail,
        deleteFunc: this.deleteUser.bind(this)
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
    });
  }

  public userSearch() {
    this.userService.getSomeUsers(this.searchString)
    .then(users => {
      this.users = users;
    });
  }
}
