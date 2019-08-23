import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagerComponent } from './user-manager.component';
import { UserFormAddEditeModalComponent } from './user-forms-add-adite-modal/user-forms-add-adite-modal.component';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { AdminGuardService } from 'src/app/guard/admin-guard.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    UserManagerComponent,
    UserFormAddEditeModalComponent,
    UserDeleteModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    UserFormAddEditeModalComponent,
    UserDeleteModalComponent
  ],
  providers: [
    // AdminGuardService
  ],
  exports: []
})
export class UserManagerModule { }
