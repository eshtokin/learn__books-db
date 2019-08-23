import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserManagerComponent } from './user-manager.component';

@NgModule({
  declarations: [
    UserManagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  entryComponents: [
  ],
  providers: [
  ],
  exports: []
})
export class UserManagerModule { }
