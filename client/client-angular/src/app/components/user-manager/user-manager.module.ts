import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagerComponent } from './user-manager.component';
import { UserFormAddEditeModalComponent } from './user-forms-add-edite-modal/user-forms-add-edite-modal.component';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/users.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormHelper } from 'src/app/services/reactive-form-helper';

@NgModule({
  declarations: [
    UserManagerComponent,
    UserFormAddEditeModalComponent,
    UserDeleteModalComponent
  ],
  imports: [
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
    UserService,
    ReactiveFormHelper
  ],
  exports: []
})
export class UserManagerModule { }
