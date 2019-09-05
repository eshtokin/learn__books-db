import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../service/users.service';
import { UserFormAddEditeModalComponent } from './user-forms-add-edite-modal/user-forms-add-edite-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { User } from '../../models/user.model';
import { Pagination } from 'src/app/models/pagination.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {
  public users: object[];
  public searchString: string;
  public onSearchStringChange = new Subject<string>();
  public paginationParams: Pagination = {
    pageIndex: 0,
    pageSize: 5,
    previousPageIndex: 0,
    length: 0
  };

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.onSearchStringChange
      .pipe(debounceTime(500))
      .subscribe(value => {
        console.log(value);
        this.userSearch();
      });
   }

  ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.userService.getAllUsers(this.paginationParams)
    .then(data => {
      this.users = data[0].users;
      this.paginationParams.length = data[0].totalCount[0].count;
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

  public userSearch(pagination: Pagination = {pageSize: this.paginationParams.pageSize, pageIndex: 0, }) {
    this.userService.getSomeUsers(this.searchString, pagination)
    .then(data => {
      console.log(data);
      this.users = data[0].users;
      this.paginationParams.length = data[0].totalCount[0].count;
    });
  }

 public paginationHandler(pageEvent) {
    if (this.searchString && this.searchString.length) {
      this.userSearch(pageEvent);
      return pageEvent;
    }
    this.paginationParams = pageEvent;
    this.init();
    return pageEvent;
  }
}
