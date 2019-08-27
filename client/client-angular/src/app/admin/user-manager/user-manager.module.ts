import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagerComponent } from './user-manager.component';
import { UserFormAddEditeModalComponent } from './user-forms-add-adite-modal/user-forms-add-adite-modal.component';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/users.service';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserManagerComponent,
    UserFormAddEditeModalComponent,
    UserDeleteModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    RouterModule.forChild([
      {path: '', component: UserManagerComponent}
    ])
  ],
  entryComponents: [
    UserFormAddEditeModalComponent,
    UserDeleteModalComponent
  ],
  providers: [
    UserService
    // AdminGuardService
  ],
  exports: []
})
export class UserManagerModule { }
